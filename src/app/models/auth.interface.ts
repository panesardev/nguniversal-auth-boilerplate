export interface LoginRequest {
	username: string;
	password: string;
}

export interface LoginResponse {
	authToken: string;
	refreshToken: string;
	timeStamp: string;
}

export interface AuthPayload {
	message: string;
	data: any | null;	
}
