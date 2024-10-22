import { useCallback, useEffect, useState } from 'react'
import {project} from "../../../Types"
import { projectsUrl } from '../../../config'
import { Status } from '../../../Types'
import { useNavigate } from 'react-router-dom'

export function useProjects () {
  
  const [data, setData] = useState<project[]>([])
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)

  //Status computed values
  const isFetching = status === "fetching"
  const isPosting = status === "posting"
    const isDeleting = status === "deleting"
  const isLoading = status === "loading" || isFetching || isPosting || isDeleting
  const isError = status === "error" || !!error;
  const isIdle = status === "idle";
  const isSuccess = status === "success";
  
  const redirect = useNavigate();

  const resetToIdle = useCallback(
      (timeout = 2000) =>
        setTimeout(() => {
          setStatus("idle");
        }, timeout),
      []
    );

  //Get projects data from server
  const fetchProjectsFromServer = useCallback(async () => {
      setStatus("fetching")
      await fetch(`${projectsUrl("get")}`)
      .then((response) => response.json())
      .then((responseData) => setData(responseData))
      .then(() => setStatus("success"))
      .catch((error) => {setError(`Error while fetching data: ${error}`), setStatus("error")})
      .finally(() => resetToIdle())
  }, [])
  
  //Gets a single project
  const getOne = async (slug: string | undefined) => {
    setStatus("fetching")
      await fetch(`${projectsUrl("getOne", slug)}`)
      .then((response) => response.json())
      .then((responseData) => setData(responseData))
      .then(() => setStatus("success"))
      .catch((error) => {setError(`Error while fetching data: ${error}`), setStatus("error")})
      .finally(() => resetToIdle())
  }

  //Add project to database
  const add = async (data: project) => {
    setStatus("posting")
    await fetch(`${projectsUrl("post")}`,
      {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then((response) => {!response.ok ? (setError(`Post request failed: ${response.status}`), setStatus("error")) : (setStatus("success"), redirect("/"))})
    .catch((error => {setError(`Error while posting data: ${error}`), setStatus("error")}))
    .finally(() => resetToIdle())   
  }

  //delete project from database
  const remove = async (data: project) => {
    setStatus("deleting")
    await fetch(`${projectsUrl("delete", "id")}`,
      {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then((response) => {!response.ok ? (setError(`Delete request failed: ${response.status}`), setStatus("error")) : (setStatus("success"), redirect("/"))})
    .catch((error => {setError(`Error while deleteing data: ${error}`), setStatus("error")}))
    .finally(() => resetToIdle())   
  }

  
  useEffect(() => {
      //Fetch projects from server
      const controller = new AbortController()
      fetchProjectsFromServer()
      return() => controller.abort()
  },[fetchProjectsFromServer])

  return {
      get: fetchProjectsFromServer,
      getOne: getOne,
      add: add,
      remove: remove,
      data: data,
      error: error,
      status: {
          idle: isIdle,
          loading: isLoading,
          success: isSuccess,
          error: isError,
          fetching: isFetching,
          posting: isPosting,
          delete: isDeleting
        },
  }
}


export default useProjects