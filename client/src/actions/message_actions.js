import axios from "axios";



// Axios =====================================================================

export const APICalls = {
  getGameMessages: game_id => axios.get(`/api/messages/`)
}