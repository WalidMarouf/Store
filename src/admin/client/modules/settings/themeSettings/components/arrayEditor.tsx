import { Paper } from "@material-ui/core"
import FlatButton from "material-ui/FlatButton"
import FloatingActionButton from "material-ui/FloatingActionButton"
import FontIcon from "material-ui/FontIcon"
import React from "react"
import { messages } from "../../../../lib"
import DynamicEditControl from "./dynamicEditControl"
import style from "./style.module.sass"

interface props {
  label
  properties
  fields
}

const ArrayEditor = (props: props) => {
  const { label, properties, fields } = props
  return (
    <div>
      <div className={style.arrayTitle}>
        {label}
        <FloatingActionButton
          mini={true}
          secondary={true}
          onClick={() => fields.push({})}
          style={{ marginLeft: "20px" }}
        >
          <FontIcon className="material-icons">add</FontIcon>
        </FloatingActionButton>
      </div>

      <ol style={{ listStyle: "none" }}>
        {fields.map((field, index) => (
          <li key={index}>
            <Paper
              style={{ margin: "20px 0 20px 20px", backgroundColor: "#f7f7f7" }}
              elevation={4}
            >
              <div className={style.arrayItemHead}>
                <FlatButton
                  label={messages.actions_delete}
                  secondary={true}
                  onClick={() => fields.remove(index)}
                />

                {index > 0 && (
                  <FlatButton
                    label={messages.actions_moveUp}
                    onClick={() => fields.move(index, index - 1)}
                  />
                )}

                {index + 1 < fields.length && (
                  <FlatButton
                    label={messages.actions_moveDown}
                    onClick={() => fields.move(index, index + 1)}
                  />
                )}
              </div>

              <div className={style.arrayInnerBox}>
                {properties.map((property, propertyIndex) => {
                  const fieldName = `${field}.${property.key}`
                  return (
                    <DynamicEditControl
                      key={propertyIndex}
                      type={property.type}
                      fieldName={fieldName}
                      label={property.label}
                      options={property.options}
                      properties={property.properties}
                    />
                  )
                })}
              </div>
            </Paper>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default ArrayEditor
