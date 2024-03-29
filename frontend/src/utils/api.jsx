import axios from 'axios'

// const serverApi = "http://localhost:5002/api"
const serverApi = "http://10.30.177.35:5002/api"

export const getRoomExist = async (roomId) => {
  try {
    const response = await axios.get(`${serverApi}/room-exists/${roomId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRoomParticipants = async (roomId) => {
  try {
    const response = await axios.get(`${serverApi}/room-participants/${roomId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};