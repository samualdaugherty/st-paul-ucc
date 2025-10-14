import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Licensing | St. Paul UCC",
 description: "All the images in this template can be used for personal or commercial use except for the images listed below.",
};

export default function LicensingPage() {
 return (
 <>
 <div className="hero-section licensing wf-section">
 <div className="wrapper-full">
 <div className="left-hero-content">
 <div className="line-block w-clearfix">
 <div className="subtitle-line"></div>
 <div className="sub-hero-tittle">OUR AMAZING IMAGES<br /></div>
 </div>
 <h1 className="white-heading">Licensing</h1>
 <p className="hero-paragraph">All the images in this template can be used for personal <br />or commercial use except for the images listed below.</p>
 </div>
 </div>
 </div>
 <div className="section-2 wf-section">
 <div className="container-2 w-container">
 <div className="licence-items">
 <div className="licence-item">
 <div className="image-div"></div>
 <div className="licence-links-wrapper">
 <a href="https://unsplash.com/" className="licence-link-2">Link</a>
 <a href="https://unsplash.com/license" className="licence-link-2">Licence</a>
 </div>
 </div>
 <div className="licence-item">
 <div className="image-div second"></div>
 <div className="licence-links-wrapper">
 <a href="https://icons8.com/" className="licence-link-2">Link</a>
 <a href="https://icons8.com/license/" className="licence-link-2">Licence</a>
 </div>
 </div>
 </div>
 </div>
 </div>
 </>
 );
}

