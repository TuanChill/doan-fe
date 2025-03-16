export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  point: number;
  phoneNumber: string | null;
  address: string | null;
  dateOfBirth: string | null;
  gender: "male" | "female" | "other" | null;
  createdAt: string;
  updatedAt: string;
};

// {
//   "id": 1,
//   "documentId": "owhbmkj7em734vuper7ty4mc",
//   "username": "luongtuan27081102@gmail.com",
//   "email": "luongtuan27081102@gmail.com",
//   "provider": "local",
//   "confirmed": false,
//   "blocked": false,
//   "createdAt": "2025-03-15T10:38:05.748Z",
//   "updatedAt": "2025-03-15T14:26:19.080Z",
//   "publishedAt": "2025-03-15T10:38:05.638Z",
//   "permission": null,
//   "point": null,
//   "address": null,
//   "gender": null,
//   "fullName": null,
//   "phone": null,
//   "dateOfBirth": null
// }
