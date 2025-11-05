import { Children } from "react";
// import { useTranslation } from "react-i18next";
import { useTranslation } from "../context/TranslationContext";
const RoutesConfig = () => {
    // const { t } = useTranslation(); 

    const dict  = useTranslation()
    return(
       [
            { name: (dict.header.home), path:"/" },
            { 
                name: (dict.header["about-us"]), path:"/about",
                children: [
                    { name: (dict.header.about["our-history"]), path:"/about/our-history" },
                    { name: (dict.header.about["our-values"]), path:"/about/our-values" },
                    { name: (dict.header.about["our-strategies"]), path:"/about/our-strategies" },
                    { name: (dict.header.about["our-products"]), path:"/about/our-products" },
                    { name: (dict.header.about["our-leadership"]), path:"/about/our-leadership" }
                    
                ]
            },
            { 
                name: (dict.header.OurProjects), path:"/our-projects",
                children: [
                    { name: (dict.header.project.rutongo), path:"/our-projects/rutongo" },
                    { name: (dict.header.project.nyakabingo), path:"/our-projects/nyakabingo" },
                    { name: (dict.header.project.musha), path:"/our-projects/musha" },
                    { name: (dict.header.project["lithium-exploration"]), path:"/our-projects/lithium-exploration" },
                    
                    
                ]
            },
        
            { name: (dict.header.sustainability), path:"/sustainability" },
            
            { 
                name: (dict.header["investor-relations"]), path:"/investor-relations",
                children: [
                    { name: (dict.header.investor.reports), path:"/investor-relations/reports" },
                    { name: (dict.header.investor.gallery["latest-news"]), path:"/investor-relations/latest-news" },
                    { name: (dict.header.investor.gallery), path:"/investor-relations/gallery/photos",
                       children: [
                        { name: (dict.header.investor["gallery-sub"].photos), path:"/investor-relations/gallery/photos" },
                        { name: (dict.header.investor["gallery-sub"].videos), path:"/investor-relations/gallery/videos" },
                       ]
                   }    
               ]
            },
            
        ]
        
      
    )
}

export default RoutesConfig