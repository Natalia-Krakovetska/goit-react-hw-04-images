import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { BsSearch } from 'react-icons/bs';
import {
  SearchbarWrapper,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';


export class SearchBar extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
      };

    state = {
      searchValue: "",
    }
    
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value.toLowerCase() });

      };


      handleSubmit = event => {
        event.preventDefault();
        if (this.state.searchValue.trim() === '') {
          return toast('Please enter keyword for image search');
        }
        this.props.onSubmit(this.state.searchValue);
        this.setState({ searchValue: '' });
      };

  render() {
    return (
      <SearchbarWrapper >
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
          <BsSearch fill="blue" />
          </SearchFormButton>

          <SearchFormInput
            
            name="searchValue"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchValue}
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchbarWrapper>
    );
  }
}
