import { useState} from "react";
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { ReactComponent as Icon } from "../icons/searchIcon.svg";
import s from './Searchbar.module.css'

const Serchbar = ({propSubmit}) => {

const [search, setSearch] = useState('')

  const nameSearch = event =>{
    setSearch(event.currentTarget.value.toLowerCase());
    }

  const submitSerch = event => {
        event.preventDefault()

        if(search.trim() === ''){
          toast.info('Enter images!')
          return;
        }
        
        propSubmit(search)
        setSearch('')
    }

        return(
        <header className={s.searchbar}>
        <form onSubmit={submitSerch} className={s.form} >
          <button type="submit" className={s.button}>
            <Icon className={s.button_label}/>
          </button>
      
          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={search}
            onChange={nameSearch}
          />
        </form>
      </header>
    )
  }

export default Serchbar;

Serchbar.propTypes = {
  propSubmit: PropTypes.func.isRequired
}