/// <reference types="vite/client" />

interface importMetaEnv {
    readonly BASE_API_URL:string
}

interface importMeta {
    readonly env: importMetaEnv
}