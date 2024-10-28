import { create } from "zustand"
import INITIAL_STATE from "../config/initialState"
import rootReducer from "../reducers/root"

export const useStoreData = create(() => INITIAL_STATE)
export const dispatch = action =>
  useStoreData.setState(state => rootReducer(state, action))