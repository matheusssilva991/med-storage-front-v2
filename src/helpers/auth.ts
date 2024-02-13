import axios from 'axios';

export async function checkToken (token: string | undefined | null) {
  if (!token) {
    return undefined;
  }

  try {
    const { data } = await axios.get('http://localhost:3000/api/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }) 
    return data.user;
  } catch (error) {
    localStorage.removeItem('token')
    return undefined;
  }
}