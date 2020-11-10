import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import React from "react"
import { messages } from "../../../../lib"
import DeleteConfirmation from "../../../shared/deleteConfirmation"

class Buttons extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openDelete: false,
    }
  }

  openDelete = () => {
    this.setState({ openDelete: true })
  }

  closeDelete = () => {
    this.setState({ openDelete: false })
  }

  deletePage = () => {
    this.setState({ openDelete: false })
    this.props.onDelete(this.props.page.id)
  }

  render() {
    const { page } = this.props
    const pageName =
      page && page.meta_title && page.meta_title.length > 0
        ? page.meta_title
        : "Draft"

    if (page && !page.is_system) {
      return (
        <>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_delete}
            onClick={this.openDelete}
          >
            <FontIcon color="#fff" className="material-icons">
              delete
            </FontIcon>
          </IconButton>
          {page.enabled && (
            <a href={page.url} target="_blank">
              <IconButton
                touch
                tooltipPosition="bottom-left"
                tooltip={messages.viewOnWebsite}
              >
                <FontIcon color="#fff" className="material-icons">
                  open_in_new
                </FontIcon>
              </IconButton>
            </a>
          )}
          <DeleteConfirmation
            open={this.state.openDelete}
            isSingle
            itemsCount={1}
            itemName={pageName}
            onCancel={this.closeDelete}
            onDelete={this.deletePage}
          />
        </>
      )
    } else {
      return null
    }
  }
}

export default Buttons
