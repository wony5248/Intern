import axios from 'axios';
import ServiceUtils from 'utils/ServiceUtils';

const registerToWaitingList:any = async (name:any, email:any) => {
  try {
    const res = await axios.post(
      '/signup',
      { name, email },
      ServiceUtils.getWaitlistAxiosConfig())
    
    return res;
  } catch (err) {
    if (err.response.status === 409) {
      throw new Error('You’re already signed up! We will be in touch soon.')
    }
    throw new Error('Error');
  }
}

export default {
  registerToWaitingList,
}