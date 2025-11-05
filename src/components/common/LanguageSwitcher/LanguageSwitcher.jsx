

// 'use client'
// import React, { useState, useEffect, useRef } from "react";
// import { useTranslation } from "react-i18next";
// import "./LanguageSwitcher.css";

// const LanguageSwitcher = () => {
//   const { i18n } = useTranslation();
//   const [isOpen, setIsOpen] = useState(false);

//   const languages = {
//     en: { label: "Eng", flag: "https://contents.trinity-metals.com/wp-content/uploads/2025/07/usa-flag-round-circle-icon.svg" },
//     kiny: { label: "Kiny", flag: "https://contents.trinity-metals.com/wp-content/uploads/2025/03/rwanda-flag-round-circle-icon.svg" },
//   };

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//     setIsOpen(false); // Close dropdown after selection
//   };

//   const dropdownRef = useRef(null);
  
//   useEffect(()=>{
   
//     const handleClickOutSide = (event) => {
//         if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
//             setIsOpen(false)
//         }
      

       
//     }

//             document.addEventListener('mousedown', handleClickOutSide)

//             return () =>{
//                 document.removeEventListener('mousedown', handleClickOutSide)
//     }
//   }, [])


//   return (
//     <div className="language-switcher" ref={dropdownRef}>
//       {/* Selected Language Button */}
//       <div className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
//       <img
//           src={languages[i18n?.language?.split("-")?.[0]]?.flag || languages.en.flag}
//           alt={i18n.language}
//           className="flag-icon"
//         />
//         <span>{languages[i18n.language?.split("-")?.[0]]?.label || languages.en.label}</span>

//       </div>

//       {/* Dropdown List */}
//       {isOpen && (
//         <ul className="dropdown-switcher" >
//           {Object.keys(languages).map((lng) => (
//             <li key={lng} onClick={() => changeLanguage(lng)}>
//               <img src={languages[lng].flag} alt={lng} className="flag-icon" />
//               <span>{languages[lng].label}</span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default LanguageSwitcher;

// components/LanguageSwitcher/LanguageSwitcher.jsx
'use client'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

const LanguageSwitcher = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const languages = {
    en: { 
      label: "Eng", 
      flag: "https://contents.trinity-metals.com/wp-content/uploads/2025/07/usa-flag-round-circle-icon.svg" 
    },
    kiny: { 
      label: "Kiny", 
      flag: "https://contents.trinity-metals.com/wp-content/uploads/2025/03/rwanda-flag-round-circle-icon.svg" 
    },
  }

  // Get current language from URL
  const getCurrentLanguage = () => {
    const segments = pathname.split('/').filter(segment => segment)
    return segments[0] in languages ? segments[0] : 'en'
  }

  const currentLanguage = getCurrentLanguage()

  const changeLanguage = (newLang) => {
    const segments = pathname.split('/').filter(segment => segment)
    
    if (segments.length > 0 && languages[segments[0]]) {
      segments[0] = newLang
    } else {
      segments.unshift(newLang)
    }
    
    const newPath = '/' + segments.join('/')
    router.push(newPath)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <div className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        <img
          src={languages[currentLanguage]?.flag}
          alt={currentLanguage}
          className="flag-icon"
        />
        <span>{languages[currentLanguage]?.label}</span>
      </div>

      {isOpen && (
        <ul className="dropdown-switcher">
          {Object.keys(languages).map((lng) => (
            <li key={lng} onClick={() => changeLanguage(lng)}>
              <img src={languages[lng].flag} alt={lng} className="flag-icon" />
              <span>{languages[lng].label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default LanguageSwitcher