import { useState, useEffect } from "react"
import { dispatch, useStoreData } from "@shared/state/store"
import {
  SET_FILE_OUTPUT_PARAMS,
  SET_FILES_SHARED_OUTPUT_PARAMS
} from "@shared/state/config/actions"
import WithRefOnFunctionProps from "@shared/ui/HOCs/WithRefOnFunctionProps"
import RangeInput from "@shared/ui/RangeInput"
import { getFormattedInputValue } from "./lib/utils/functions"
import useNotification from "./model/hooks/useNotification"
import styles from "./ui/styles.module.css"

const SELECT_OPTION_SEPARATOR = " x "

const handleFormSubmit = (fileName, showNotification) => (ref, event) => {
  event.preventDefault()

  const outputParams = [
    ...ref.current.querySelectorAll("input"),
    ...ref.current.querySelectorAll("select")
  ]
    .filter(input => input.name)
    .reduce((acc, input) => {
      const value = getFormattedInputValue(input, {
        selectOptionSeparator: SELECT_OPTION_SEPARATOR
      })

      return { ...acc, [input.name]: value }
    }, {})

  fileName
    ? dispatch({
        type: SET_FILE_OUTPUT_PARAMS,
        payload: { fileName, outputParams }
      })
    : dispatch({
        type: SET_FILES_SHARED_OUTPUT_PARAMS,
        payload: { outputParams }
      })

  showNotification()
}

const ParamsForm = ({ fileName, serverOutputParams, ...attributes }) => {
  const outputParams = fileName
    ? useStoreData(state => state.filesConfig[fileName]?.outputParams)
    : useStoreData(state => state.filesSharedConfigCache?.outputParams)

  const [paramsCache, setParamsCache] = useState(outputParams)
  const { isNotificationVisible, setVisibleNotification } =
    useNotification(1500)

  const handleInputChange = serverOutputParam => ref => {
    const currentValue = getFormattedInputValue(ref.current, {
      selectOptionSeparator: SELECT_OPTION_SEPARATOR
    })

    setParamsCache(state => {
      if (serverOutputParam?.disables_params_on_value) {
        const filteredParams = serverOutputParams
          .filter(
            param =>
              !serverOutputParam.disables_params_on_value[
                currentValue
              ].includes(param.name)
          )
          .reduce((acc, param) => {
            return { ...acc, [param.name]: state[param.name] || param.default }
          }, {})

        return {
          ...filteredParams,
          [serverOutputParam.name]: currentValue
        }
      }

      return { ...state, [serverOutputParam.name]: currentValue }
    })
  }

  const resetFieldsToDefault = () => {
    const defaultOutputParams = serverOutputParams.reduce((acc, param) => {
      return { ...acc, [param.name]: param.default }
    }, {})

    setParamsCache(defaultOutputParams)
  }

  useEffect(() => {
    setParamsCache(outputParams)
  }, [outputParams])

  return !paramsCache ? null : (
    <WithRefOnFunctionProps
      onSubmit={handleFormSubmit(fileName, setVisibleNotification)}
      className={styles["params-form"]}
      {...attributes}
      component={
        <form>
          <section className={styles["params-container"]}>
            {serverOutputParams.map(param => {
              if (paramsCache[param.name] == null) return null

              return (
                <div className={styles["form-group"]} key={param.name}>
                  <label htmlFor={param.name}>{param.label}:</label>
                  {param?.is_bool ? (
                    <div className="flex gap-50">
                      <WithRefOnFunctionProps
                        onChange={handleInputChange(param)}
                        component={
                          <input
                            id={param.name}
                            name={param.name}
                            type="checkbox"
                            checked={paramsCache?.[param.name] || param.default}
                          ></input>
                        }
                      />
                      <p className="text-secondary">{param.description}</p>
                    </div>
                  ) : param?.is_range ? (
                    <div className="flex flex-column">
                      <WithRefOnFunctionProps
                        onChange={handleInputChange(param)}
                        component={
                          <RangeInput
                            // Key resets component state when changes
                            key={paramsCache?.[param.name] || param.default}
                            id={param.name}
                            name={param.name}
                            min={param.min}
                            max={param.max}
                            value={paramsCache?.[param.name] || param.default}
                          />
                        }
                      />
                      <p className="text-secondary">{param.description}</p>
                    </div>
                  ) : (
                    param?.options && (
                      <div className="flex gap-50">
                        <WithRefOnFunctionProps
                          onChange={handleInputChange(param)}
                          component={
                            <select
                              id={param.name}
                              name={param.name}
                              value={
                                Array.isArray(paramsCache?.[param.name])
                                  ? paramsCache[param.name].join(" x ")
                                  : paramsCache[param.name] ||
                                      Array.isArray(param.default)
                                    ? param.default.join(" x ")
                                    : param.default
                              }
                            >
                              {param.options.map(option => (
                                <option key={`${option}`}>
                                  {Array.isArray(option)
                                    ? option.join(" x ")
                                    : option}
                                </option>
                              ))}
                            </select>
                          }
                        />
                        <p className="text-secondary">{param.description}</p>
                      </div>
                    )
                  )}
                </div>
              )
            })}
            <div
              className={styles["action-alert"]}
              aria-hidden={!isNotificationVisible ? true : null}
              data-shown={isNotificationVisible ? true : null}
            >
              Settings applied
            </div>
          </section>
          <section className={styles["form-actions"]}>
            <button
              onClick={resetFieldsToDefault}
              className={styles["reset-btn"]}
              type="button"
            >
              Reset to defaults
            </button>
            <button className={styles["apply-btn"]} type="submit">
              {fileName ? "Apply" : "Apply to all"}
            </button>
          </section>
        </form>
      }
    />
  )
}

export default ParamsForm
