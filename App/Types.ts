import { UUID } from "crypto"

export type involvement = {
  role: string,
  company: string,
  logo: string,
  duration: {
    from: String
    to: String
  }
} 

export type person = {
    name: string,
    degrees: string[],
    points: number,
    email: string,
    experiences: involvement[]
  }

  export type project = {
  id: string,
  header: string
  slug: string
  summary: string
  tags: string[]
  image: string
  imagealt: string
  repository: string
  article: string
  createdat: number
  public: boolean,
  status: "draft" | "published"
  }

  export type contactMessage = {
    id: string
    person: string
    email: string
    message: string
    recievedAt: number
  }

  export type fetchPort = {
    get?: String,
    post?: String,
    delete?: String
    getOne?: String
  }

  export type Status = "idle" | "loading" | "error" | "success" | "fetching" | "posting" | "deleting"
  export type fetch = "get" | "getOne" | "post" | "delete"