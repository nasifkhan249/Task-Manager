export default function getTokenFromCookie  ()  {
    const cookies = document.cookie.split(';');
    const token = cookies.find(cookie => cookie.trim().startsWith('token='));
    return token ? token.split('=')[1] : null;
}


