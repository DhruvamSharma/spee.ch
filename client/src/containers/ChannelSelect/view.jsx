import React from 'react';
import ChannelLoginForm from '@containers/ChannelLoginForm';
import ChannelCreateForm from '@containers/ChannelCreateForm';
import { LOGIN, CREATE } from '../../constants/publish_channel_select_states';
import RowLabeled from '@components/RowLabeled';
import ChooseAnonymousPublishRadio from '@components/ChooseAnonymousPublishRadio';
import ChooseChannelPublishRadio from '@components/ChooseChannelPublishRadio';
import FormFeedbackDisplay from '@components/FormFeedbackDisplay';
import Label from '@components/Label';
import ChannelSelectDropdown from '@components/ChannelSelectDropdown';

class ChannelSelect extends React.Component {
  constructor (props) {
    super(props);
    if (!props.disableAnonPublishing) {
      this.toggleAnonymousPublish = this.toggleAnonymousPublish.bind(this);
    }
    this.handleSelection = this.handleSelection.bind(this);
  }
  componentWillMount () {
    const { loggedInChannelName } = this.props;
    if (loggedInChannelName) {
      this.props.onChannelSelect(loggedInChannelName);
    }
  }
  toggleAnonymousPublish (event) {
    const value = event.target.value;
    if (value === 'anonymous') {
      this.props.onPublishInChannelChange(false);
    } else {
      this.props.onPublishInChannelChange(true);
    }
  }
  handleSelection (event) {
    const selectedOption = event.target.selectedOptions[0].value;
    this.props.onChannelSelect(selectedOption);
  }
  render () {
    const {
      publishInChannel,
      channelError,
      selectedChannel,
      loggedInChannelName,
      disableAnonPublishing,
    } = this.props;
    return (
      <div>
        {disableAnonPublishing ? (
          <FormFeedbackDisplay
            errorMessage={channelError}
            defaultMessage={'Choose a channel'}
          />
        ) : (
          <React.Fragment>
            <RowLabeled
              label={
                <ChooseAnonymousPublishRadio
                  publishInChannel={publishInChannel}
                  toggleAnonymousPublish={this.toggleAnonymousPublish}
                />
              }
              content={
                <ChooseChannelPublishRadio
                  publishInChannel={publishInChannel}
                  toggleAnonymousPublish={this.toggleAnonymousPublish}
                />
              }
            />
            <FormFeedbackDisplay
              errorMessage={channelError}
              defaultMessage={'Publish anonymously or in a channel'}
            />
          </React.Fragment>
        )}
        { this.props.publishInChannel && (
          <div>
            <RowLabeled
              label={
                <Label value={'Channel:'} />
              }
              content={
                <ChannelSelectDropdown
                  selectedChannel={selectedChannel}
                  handleSelection={this.handleSelection}
                  loggedInChannelName={loggedInChannelName}
                />
              }
            />
            { (selectedChannel === LOGIN) && <ChannelLoginForm /> }
            { (selectedChannel === CREATE) && <ChannelCreateForm /> }
          </div>
        )}
      </div>
    );
  }
}

export default ChannelSelect;
