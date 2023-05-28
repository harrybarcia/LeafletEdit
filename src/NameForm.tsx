import React from 'react';
import axios from 'axios';
export class NameForm extends React.Component {
    constructor(props: any) {
      super(props);
      this.state = {value: props.data || ''};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event: any) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event: any) {
      event.preventDefault();
      axios.put(`http://localhost:3002/api/markers/${id}`, {
        markerType: this.state.value
        }).then((response) => {
        console.log(response.data);
        }
        );

    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value.markerType} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }