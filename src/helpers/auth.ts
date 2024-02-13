import axios from 'axios';

export async function checkToken (token: string | undefined | null) {
  if (!token) {
    return false;
  }

  try {
    const { data } = await axios.get('http://localhost:3000/api/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }) 
    return true;
  } catch (error) {
    localStorage.removeItem('token')
    return false;
  }
}