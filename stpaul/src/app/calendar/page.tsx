import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Calendar | St. Paul UCC",
 description: "We value our community and are always here for you.",
};

export default function CalendarPage() {
 return (
 <>
 <div className="hero-section contact wf-section">
 <div className="wrapper-full">
 <div className="left-hero-content">
 <div className="line-block w-clearfix">
 <div className="subtitle-line"></div>
 <div className="sub-hero-tittle">DROP US A LINE</div>
 </div>
 <h1 className="white-heading">CALENDAR OF EVENTS</h1>
 <p className="hero-paragraph">Everything happening at St. Paul UCC-Pekin<a href="https://webflow.com/design/santi-57ed0f#"><br /></a>
 </p>
 </div>
 </div>
 </div>
 <div className="section wf-section">
 <div className="wrapper-full border new">
 <div className="w-embed w-iframe"><iframe src="https://calendar.google.com/calendar/embed?src=ome8qbefhpr1a164or4gqojm78%40group.calendar.google.com&ctz=America%2FChicago" style={{border: 0}} width="800" height="600" frameBorder="0" scrolling="no"></iframe></div>
 </div>
 </div>
 </>
 );
}

