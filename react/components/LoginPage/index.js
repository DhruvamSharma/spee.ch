import React from 'react';
import NavBar from 'containers/NavBar';
import ChannelLoginForm from 'containers/ChannelLoginForm';
import ChannelCreateForm from 'containers/ChannelCreateForm';

class PublishPage extends React.Component {
  render () {
    return (
      <div>
        <NavBar/>
        <div className="row row--padded">
          <div className="column column--5 column--med-10 align-content-top">
            <div className="column column--8 column--med-10">
              <p>Channels allow you to publish and group content under an identity. You can create a channel for yourself, or share one with like-minded friends.  You can create 1 channel, or 100, so whether you're <a className="link--primary" target="_blank" href="/@catalonia2017:43dcf47163caa21d8404d9fe9b30f78ef3e146a8">documenting important events</a>, or making a public repository for <a className="link--primary" target="_blank" href="/@catGifs">cat gifs</a> (password: '1234'), try creating a channel for it!</p>
            </div>
          </div><div className="column column--5 column--med-10 align-content-top">
            <div className="column column--8 column--med-10">
              <h3 className="h3--no-bottom">Log in to an existing channel:</h3>
              <ChannelLoginForm />
              <h3 className="h3--no-bottom">Create a brand new channel:</h3>
              <ChannelCreateForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PublishPage;
