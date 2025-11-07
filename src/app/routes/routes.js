import { Children } from "react";
// import { useTranslation } from "react-i18next";
import Locale from '../i18n/config'
import { useTranslation } from "../context/TranslationContext";
const RoutesConfig = () => {
    // const { t } = useTranslation(); 

    const { dict, lang } = useTranslation()

    const currentLang = lang || 'en'

    return(
       [
            { name: (dict.header.home), path:`/${currentLang}/` },
            { 
                name: (dict.header["about-us"]), path:`/${currentLang}/about`,
                children: [
                    { name: (dict.header.about["our-history"]), path:`/${currentLang}/about#our-history` },
                    { name: (dict.header.about["our-values"]), path:`/${currentLang}/about/#our-values` },
                    { name: (dict.header.about["our-strategies"]), path:`/${currentLang}/about/#our-strategies` }, 
                    { name: (dict.header.about["our-products"]), path:`/${currentLang}/about/#our-products`},
                    { name: (dict.header.about["our-leadership"]), path:`/${currentLang}/about/#our-values` }
                    
                ]
            },
            { 
                name: (dict.header.OurProjects), path:`/${currentLang}/projects`,
                children: [
                    { name: (dict.header.project.rutongo), path:`/${currentLang}/projects/rutongo-mine` },
                    { name: (dict.header.project.nyakabingo), path:`/${currentLang}/projects/nyakabingo-mine` },
                    { name: (dict.header.project.musha), path:`/${currentLang}/projects/musha-mine` },
                    { name: (dict.header.project["lithium-exploration"]), path:`/${currentLang}/projects/lithium` },
                    
                    
                ]
            },
        
            { name: (dict.header.sustainability), path:`/${currentLang}/sustainability`},
            
            { 
                name: (dict.header["investor-relations"]), path:`/${currentLang}/investor`,
                children: [
                    { name: (dict.header.investor.reports), path:`/${currentLang}/investor/reports` },
                    { name: (dict.header.investor["latest-news"]), path:`/${currentLang}/investor/latest-news` },
                    { name: (dict.header.investor.gallery), path:`/${currentLang}/investor/gallery` ,
                       children: [
                        { name: (dict.header.investor["gallery-sub"].photos), path:`/${currentLang}/investor/gallery/photos`  },
                        { name: (dict.header.investor["gallery-sub"].videos), path:`/${currentLang}/investor/gallery/videos` },
                       ]
                   }    
               ]
            },
            
        ]
        
      
    )
}

export default RoutesConfig