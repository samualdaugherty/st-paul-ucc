import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Community Outreach at St. Paul UCC",
 description: "As a faith community who values every person as a child of God, we pay particularly close attention to individuals and local communities of people in need.",
};

export default function CommunityOutreachPage() {
 return (
 <>
 <div className="hero-section ministries wf-section">
 <div className="wrapper-full">
 <div className="left-hero-content">
 <div className="line-block w-clearfix">
 <div className="subtitle-line"></div>
 <div className="sub-hero-tittle">ST. PAUL&#x27;S UNITED CHURCH OF CHRIST<br /></div>
 </div>
 <h1 className="white-heading">Community Outreach</h1>
 <p className="hero-paragraph">As a faith community who values every person as a child of God, we pay particularly close attention to individuals and local communities of people in need.</p>
 </div>
 </div>
 </div>
 <div className="section wf-section">
 <div className="wrapper-full">
 <h3 className="heading-20">Our outreach ministries include:</h3>
 <div className="columns w-row">
 <div className="w-col w-col-5"><img src="images/mardigrasservicegallery-34.jpg" sizes="(max-width: 479px) 96vw, (max-width: 767px) 90vw, (max-width: 991px) 37vw, 38vw" srcSet="images/mardigrasservicegallery-34-p-1080.jpeg 1080w, images/mardigrasservicegallery-34-p-1600.jpeg 1600w, images/mardigrasservicegallery-34.jpg 1620w" alt="" /></div>
 <div className="w-col w-col-7">
 <h4 className="heading-7">Our Food Pantry</h4>
 <p className="paragraph-12">The food pantry is open on the third Thursday of the month or by special appointment.</p>
 <h4 className="heading-8">Pekin Outreach Initiative</h4>
 <p>Partnering with the Pekin Outreach Initiative (POI) to serve a free and open lunch to the community one Saturday per month.</p>
 <h4 className="heading-9">Donations</h4>
 <p>Annual donations to organizations such as Christian Civic Outreach and the Carole House of Hope.</p>
 </div>
 </div>
 <div className="columns-3 w-row">
 <div className="w-col w-col-3">
 <h4 className="heading-10">Schools</h4>
 <p>Assembling weekly snack packs for needy children within Pekin School District 108</p>
 </div>
 <div className="w-col w-col-3">
 <h4 className="heading-11">Women&#x27;s Literacy</h4>
 <p>Supporting the YWCA&apos;s Adult Literacy Program</p>
 </div>
 <div className="w-col w-col-3">
 <h4 className="heading-12">Children&#x27;s Literacy</h4>
 <p>Partnering with Willow and Starke Schools to purchase and deliver books as personal gifts to their students</p>
 </div>
 <div className="w-col w-col-3">
 <h4 className="heading-13">Relay for Life</h4>
 <p>Annual participation in the American Cancer Society&apos;s Relay for Life</p>
 </div>
 </div>
 </div>
 </div>
 </>
 );
}

