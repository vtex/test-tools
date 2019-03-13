import React, { FunctionComponent } from "react"
import { FormattedMessage } from "react-intl"

const HelloWorld: FunctionComponent = () => {
  return (
    <div>
      <FormattedMessage id="example" />
    </div>
  )
}

export default HelloWorld
