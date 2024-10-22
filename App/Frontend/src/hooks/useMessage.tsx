import { useCallback, useState } from 'react'
import { messageUrl } from '../../../config'
import { contactMessage, Status } from '../../../Types'

export function useMessage () {

    const [status, setStatus] = useState<Status>("idle")
    const [error, setError] = useState<string | null>(null)

    //Status computed values
    const isFetching = status === "fetching"
    const isPosting = status === "posting"
    const isLoading = status === "loading" || isFetching || isPosting
    const isError = status === "error" || !!error;
    const isIdle = status === "idle";
    const isSuccess = status === "success";
    

    const resetToIdle = useCallback(
        (timeout = 2000) =>
            setTimeout(() => {
            setStatus("idle");
            }, timeout),[]
        );

    const add = async (data: contactMessage) => { 
        setStatus("posting")
        await fetch(`${messageUrl.post}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => {!response.ok ? (setError(`Post request failed: ${response.status}`), setStatus("error")) : setStatus("success")})
        .catch((error => {setError(`Error while posting data: ${error}`), setStatus("error")}))
        .finally(() => resetToIdle())
    }

    

    
    return {
        add: add,
        error: error,
        status: {
            idle: isIdle,
            loading: isLoading,
            success: isSuccess,
            error: isError,
            fetching: isFetching,
            posting: isPosting
          },
    }

}