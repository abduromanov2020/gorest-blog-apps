export interface UserCredentials {
    name: string
    token: string
}

export interface UserRegistrationResponse {
    id: string
    name: string
    email: string
    gender: string
    status: string
}

export interface RegistrationModalProps {
    isOpen: boolean
    onClose: () => void
}