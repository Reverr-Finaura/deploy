import React from 'react'
import styles from "./CountryCodePicker.module.css"
import { RiArrowDownSLine } from 'react-icons/ri';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCountrySelected } from '../../features/countryCodeSlice';

const CountryCodePicker = () => {
    const selectedCountry=useSelector((state)=>state.countryCode)
    const[countryCodeArr,setCountryCodeArr]=useState([])
    const[isCountryCodePickerClick,setIsCountryCodePickerClick]=useState(false)
    const dispatch=useDispatch()
    const[searchCountryText,setSearchCountryText]=useState("")
    const[countryListToShow,setCountryListToShow]=useState([])

//FETCH COUNTRYCODES
useEffect(()=>{
    const fetchCountryCode=async()=>{
        const data=await fetch("https://gist.githubusercontent.com/kcak11/4a2f22fb8422342b3b3daa7a1965f4e4/raw/2cc0fcb49258c667f1bc387cfebdfd3a00c4a3d5/countries.json")
        const res=await data.json()
        setCountryCodeArr(res)
    }
fetchCountryCode()
},[])

function filterCountriesByExactMatch(countries, searchWord) {
    return countries.filter(country => {

      const lowercaseCountry = country.name.toLowerCase();
      const lowercaseSearchWord = searchWord.toLowerCase();
  

      if (lowercaseCountry.startsWith(lowercaseSearchWord)) {

        for (let i = 0; i < searchWord.length; i++) {
         
          if (lowercaseCountry[i] !== lowercaseSearchWord[i]) {
            return false; 
          }
        }
        return true; 
      }
      return false; 
    });
  }

//ON COUNTRY SEARCH
useEffect(()=>{
if(searchCountryText===""){setCountryListToShow(countryCodeArr);return}

    const filteredCountry=filterCountriesByExactMatch(countryCodeArr,searchCountryText)
    setCountryListToShow(filteredCountry)



},[searchCountryText,countryCodeArr])

  return (
 <>
    <div onClick={(e)=>{e.stopPropagation();setIsCountryCodePickerClick((p)=>!p)}} className={styles.signup_form_onboarding_countryCode_selector_inputCont}>
    <img style={{width:"30px"}} src={selectedCountry.flag} alt='map'></img>
    <p>{selectedCountry?.dialCode}</p>
    <RiArrowDownSLine style={{marginLeft:".25rem",fontSize:"1.1rem"}}/>
    </div>
    {isCountryCodePickerClick&&<div className={styles.signup_form_onboarding_countryCode_selector_inputCont_selector}>
    <input name="country" autoComplete='off' autoFocus className={styles.signup_form_onboarding_countryCode_selector_country_search_input} onChange={(e)=>setSearchCountryText(e.target.value)} onClick={(e)=>{e.preventDefault();e.stopPropagation()}} type="text" placeholder='Search country' value={searchCountryText} />
    {countryListToShow.map((cc)=>{
    return <>
    <div style={{background:selectedCountry.isoCode===cc.isoCode?"#898989":""}} onClick={()=>{setIsCountryCodePickerClick(false);dispatch(setCountrySelected(cc))}} key={cc.isoCode}  className={styles.signup_form_onboarding_countryCode_selector_inputCont_selector_option}>
    <img style={{width:"30px"}} src={cc.flag} alt='map'></img>
    <p style={{marginLeft:".5rem"}}>{cc.name}</p>
    <p style={{marginLeft:".5rem"}}>{`(${cc.dialCode})`}</p>
    </div>
    </>
     })}
    </div>}
 </>
  )
}

export default CountryCodePicker