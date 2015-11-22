var ProfileView = React.createClass({

  render () {
    return (
      <div className="container">
        <p> "Hey im a prfile page for"  + {this.props.userID} </p>

      </div>
    )
  }
});

Template.profileTemplate.helpers({
  ProfileView() {
    return ProfileView;
  }
});
