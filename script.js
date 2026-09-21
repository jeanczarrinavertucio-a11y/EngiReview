/* =========================================================
  ENGIReview
  STRUCTURAL ENGINEERING REVIEWER
  MAIN JAVASCRIPT
========================================================= */


/* =========================================================
  DATA STORAGE
========================================================= */

const STORAGE_KEY =
 "structuralReviewerData";


let data =
 loadData();


function createDefaultData() {

 return {

   name: "",

   quizScores: [],

   examHistory: [],

   questionsAnswered: 0,

   completedTopics: [],

   mistakes: [],

   progress: {
     steel: {},
     reinforcedConcrete: {},
     prestressedConcrete: {}
   },

   studyHistory: [],

   solverHistory: [],

   formulaFavorites: [],

   tutorHistory: []

 };

}


function loadData() {

 try {

   const saved =
     localStorage.getItem(
       STORAGE_KEY
     );

   if (!saved) {

     return createDefaultData();

   }

   const parsed =
     JSON.parse(saved);

   const defaults =
     createDefaultData();

   return {

     ...defaults,

     ...parsed,

     progress: {
       ...defaults.progress,
       ...(parsed.progress || {})
     },

     quizScores:
       parsed.quizScores || [],

     examHistory:
       parsed.examHistory || [],

     mistakes:
       parsed.mistakes || [],

     solverHistory:
       parsed.solverHistory || [],

     formulaFavorites:
       parsed.formulaFavorites || [],

     tutorHistory:
       parsed.tutorHistory || [],

     completedTopics:
       parsed.completedTopics || [],

     studyHistory:
       parsed.studyHistory || []

   };

 } catch (error) {

   console.warn(
     "Could not load saved data.",
     error
   );

   return createDefaultData();

 }

}


function saveData() {

 localStorage.setItem(
   STORAGE_KEY,
   JSON.stringify(data)
 );

}


/* =========================================================
  SUBJECT TOPICS
========================================================= */

const subjectTopics = {

  steel: [

    {
      name: "Introduction to Steel Structures",
      syllabusWeek: "Week 1",
      description: "Steel structures, handbooks and specifications, steel properties, notation, calculations, and design philosophies.",
      content: {
        overview: "The reviewer material introduces structural steel design through steel behavior, properties, specifications, notation and calculation procedures. The fundamental design requirement is required strength ≤ available strength.",
        keyPoints: [
          "Structural steel members and their applications.",
          "Steel properties and section properties used in design.",
          "Handbooks and specifications, including NSCP 2015 references used in the material.",
          "Design philosophies: ASD and LRFD.",
          "ASD compares the required strength with the allowable strength.",
          "ASD criterion: Required Strength ≤ Allowable Strength.",
          "The allowable strength is obtained by dividing the nominal strength by the applicable factor of safety.",
          "ASD relationship: Rₐ ≤ Rₙ / Ω.",
          "Rₐ is the required strength, Rₙ is the nominal strength, and Ω is the applicable ASD safety factor.",
          "The factor of safety reduces the nominal strength to obtain the allowable strength used for design.",
          "LRFD applies load factors to service loads and a resistance factor to nominal strength.",
          "The material states the LRFD criterion as factored load ≤ factored strength."
        ],
        formulas: [
          "Required strength ≤ available strength",
          "ASD: Required Strength ≤ Allowable Strength",
          "ASD: Rₐ ≤ Rₙ / Ω",
          "Allowable Strength = Nominal Strength / Factor of Safety",
          "Rₐ = required strength",
          "Rₙ = nominal strength",
          "Ω = applicable ASD safety factor",
          "LRFD: factored load ≤ factored strength"
        ],
        asdExplanation: {
          criterion: "Required Strength ≤ Allowable Strength",
          equation: "Rₐ ≤ Rₙ / Ω",
          allowableStrength: "Allowable Strength = Nominal Strength / Factor of Safety",
          variables: [
            "Rₐ = required strength",
            "Rₙ = nominal strength",
            "Ω = applicable ASD safety factor"
          ],
          explanation: "In ASD, the required strength must not exceed the allowable strength. The allowable strength is obtained by dividing the nominal strength by the applicable safety factor."
        }
      }
    },

    {
      name: "Tension Members",
      syllabusWeek: "Week 2",
      description: "Analysis, effective net area, tension-member failure modes, and design of members subjected to axial tension.",
      content: {
        overview: "Tension members are structural elements subjected to axial tensile forces. The material covers gross area, net area, effective net area, shear lag, rupture, yielding and block shear.",
        keyPoints: [
          "Tension members include truss members, building and bridge bracing, and cable-supported systems.",
          "Gross area Ag is the original, unaltered cross-sectional area.",
          "Net area An represents the cross-sectional area available to be stressed in tension after deductions for holes.",
          "Effective net area Ae accounts for incomplete connection and shear lag.",
          "Tension-member failure modes include gross-section yielding, net-section rupture, and block shear.",
          "Shear lag occurs when only part of a cross section is connected, such as one leg of an angle connected to a gusset plate.",
          "The critical section is the path producing the minimum area."
        ],
        formulas: [
          "Ft = P / A",
          "Pt = Ft A",
          "Use Ag, An, or Ae as appropriate to the limit state."
        ]
      }
    },

    {
      name: "Axially Loaded Compression Members",
      syllabusWeek: "Weeks 3–4",
      description: "Effective length, column theory, Euler buckling, flexural buckling, local stability, and design of axially loaded columns.",
      content: {
        overview: "Compression members subjected to axial compressive force are treated as columns. The material develops column stability through critical buckling load, effective length, slenderness, and local stability.",
        keyPoints: [
          "The ideal axial stress is represented by Fa = P/A, but real columns may have accidental eccentricity, out-of-straightness, and residual stress.",
          "Euler critical load is the compressive load at which a slender column suddenly bends or buckles.",
          "Effective length is the column length associated with buckling and depends on end support conditions.",
          "The material considers flexural buckling as the primary effective-length failure mode.",
          "Overall instability may occur as flexural buckling, torsional buckling, or flexural-torsional buckling.",
          "Thin compression elements may experience local buckling before the full section strength can develop.",
          "NSCP 2015 Section 505.3 is identified for compressive strength for flexural buckling of members without slender elements.",
          "NSCP 2015 Section 505.7 covers members with slender elements, including slender unstiffened and stiffened elements."
        ],
        formulas: [
          "Fa = P / A",
          "Euler critical-load relationship: Pcr = π²EI / (KL)²"
        ]
      }
    },

    {
      name: "Beams — Allowable Bending Stresses",
      syllabusWeek: "Week 6",
      description: "Steel beams, section properties, yielding, plastic behavior, shape classification, and flexural strength.",
      content: {
        overview: "Beams support transverse loads and are primarily subjected to flexure and shear. The material covers elastic and plastic bending, section classification, beam stability, and flexural limit states.",
        keyPoints: [
          "Beam types discussed include floor beams, girders, lintels, purlins, rafters, spandrel beams and stringer beams.",
          "Common sections include rolled universal beams, compound beams, composite beams and castellated beams.",
          "Beam bending behavior progresses from elastic response toward yielding and full plasticity.",
          "When the full cross section yields, a plastic hinge may form and contribute to a collapse mechanism.",
          "Beam stability can involve overall instability or local instability.",
          "Shape classification uses width-to-thickness and depth-to-thickness limits.",
          "Compact sections can develop plastic moment strength before local buckling.",
          "Noncompact and slender elements can limit flexural strength through local buckling.",
          "Flexural failure modes include lateral-torsional buckling, flange local buckling and web local buckling."
        ],
        formulas: [
          "Elastic bending stress: fb = M / S",
          "Yield moment: My = Fy S",
          "Plastic moment: Mp = Fy Z"
        ]
      }
    },

    {
      name: "Shear in Beams",
      syllabusWeek: "Week 7",
      description: "Shear stress distribution, shear strength, effective shear area, and NSCP requirements for steel beams.",
      content: {
        overview: "The material presents shear stress distribution using VQ/Ib and discusses the effective shear area and allowable shear stress for rolled and fabricated steel shapes.",
        keyPoints: [
          "Shear stress at a point is related to shear force V, first moment Q, moment of inertia I, and local width b.",
          "For W shapes, the effective shear area is taken as overall depth times web thickness.",
          "The material gives the allowable shear stress as Fv = 0.6Fy.",
          "Shear is commonly checked after flexural adequacy has been established for rolled steel beams.",
          "NSCP specification requirements are used for the beam shear checks."
        ],
        formulas: [
          "fv = VQ / (Ib)",
          "Av = d tw",
          "Fv = 0.6 Fy"
        ]
      }
    },

    {
      name: "Web Yielding, Web Crippling & Beam Bearing Plates",
      syllabusWeek: "Weeks 8–9",
      description: "Concentrated-load effects on beam webs, web yielding, web crippling, bearing plates, concrete bearing, and plate thickness.",
      content: {
        overview: "The material covers concentrated loads and reactions acting through beam flanges and the design of beam bearing plates used to distribute reactions to concrete or masonry.",
        keyPoints: [
          "Local web yielding occurs when a concentrated load is applied normal to one flange and symmetric to the web.",
          "Web crippling is buckling of the web caused by a compressive force delivered through the flange.",
          "Beam bearing plates distribute beam reactions over supporting concrete or masonry.",
          "Bearing-plate design has three main steps: determine bearing length to prevent web yielding and crippling; determine plate width for supporting-material bearing; determine plate thickness for bending strength.",
          "Concrete bearing strength must be checked because the supporting material must resist the bearing load.",
          "Column base plates are related but are subjected to two-way bending; web yielding and web crippling are not governing factors for column base plates."
        ],
        formulas: [
          "Design bearing length to prevent web yielding and web crippling.",
          "Select B × lb to provide adequate bearing area.",
          "Select plate thickness t for adequate bending strength."
        ]
      }
    },

    {
      name: "Combined Stresses",
      syllabusWeek: "Weeks 11–12",
      description: "Axial compression and bending, eccentrically loaded columns, and members subjected to combined axial tension and bending.",
      content: {
        overview: "The material treats members subjected to more than one type of action as beam-columns or members under combined forces and bending.",
        keyPoints: [
          "Members carrying axial compression together with bending moments are beam-columns.",
          "Accidental eccentricity and out-of-straightness can introduce bending in compression members, although the material notes these secondary effects are usually ignored when no applied moment is present.",
          "AISC Chapter H is identified for design of members for combined forces and torsion.",
          "The examples use interaction equations combining axial force ratios with bending-moment ratios.",
          "Braced versus unbraced frame behavior is distinguished in the combined-stress discussion.",
          "For LRFD examples, factored axial force and factored moments are compared with available strengths."
        ],
        formulas: [
          "Interaction checks combine Pr/Pc with bending-strength ratios.",
          "For the examples, when Pr/Pc ≤ 0.20, a reduced form of the interaction equation is used; otherwise the full interaction expression is applied."
        ]
      }
    },

    {
      name: "Biaxial Bending & Purlins",
      syllabusWeek: "Weeks 12–13",
      description: "Members subjected to bending about both axes and introductory design considerations for purlins.",
      content: {
        overview: "The syllabus identifies biaxial bending and purlin design as a dedicated topic. The supplied steel-design PDF discusses purlins as roof beams supported by roof trusses and distinguishes bending behavior about structural axes.",
        keyPoints: [
          "Biaxial bending involves flexure about both principal axes.",
          "Purlins are roof beams supported by roof trusses.",
          "The PDF also identifies rafters as roof beams supported by purlins.",
          "For a complete code design, bending about both axes and the applicable interaction requirements should be checked using the governing course specification."
        ],
        formulas: [
          "Use the applicable biaxial interaction relationship from the course NSCP/AISC provisions."
        ]
      }
    },

    {
      name: "Bolted/Riveted Connections",
      syllabusWeek: "Week 15",
      description: "Types of bolted connections, allowable stresses, bearing, bolt shear, block shear, staggered holes, and eccentric loading.",
      content: {
        overview: "Modern steel structures are connected by welding or bolting. The supplied material covers bolted connection assumptions, fastener and connected-part failure modes, bearing strength, tensile strength, block shear, staggered holes, and eccentric loading.",
        keyPoints: [
          "Simple connections are treated as connections where the resultant force passes through the center of gravity of the connection.",
          "Bolted-connection assumptions include equal distribution of transferred stress among bolts, negligible bolt bending, and consideration of bolt shear, bearing, net-section tension and edge tearing.",
          "Failure can occur in the fastener or in the connected parts.",
          "Connected-part checks include gross-area tension, effective-net-area tension, block shear and bearing.",
          "For staggered holes, the least net width is obtained by deducting hole diameters along the selected path and adding the stagger correction associated with pitch and gage.",
          "Eccentrically loaded bolt groups are analyzed using the vector sum of direct and indirect/torsional resistances."
        ],
        formulas: [
          "Check bolt shear strength.",
          "Check bearing strength of the connected material.",
          "Check gross-section tension, effective-net-section tension, and block shear as applicable.",
          "For eccentric loading, combine direct and torsional components vectorially."
        ]
      }
    },

    {
      name: "Welded Connections",
      syllabusWeek: "Weeks 16–17",
      description: "Types of welded connections, fillet-weld strength and behavior, axially loaded welded connections, block shear, and eccentrically loaded welded connections.",
      content: {
        overview: "Structural welding joins parts by heating and fusing them, with filler metal deposited from an electrode. The material focuses on fillet welds, axially loaded welded connections and eccentric loading.",
        keyPoints: [
          "Structural welding fuses the connected parts and weld metal into a continuous joined region.",
          "Shielded metal arc welding (SMAW) uses an electrode and a protective gaseous shield; slag forms as the weld cools and must be removed before painting or another pass.",
          "Fillet-weld design assumes a 45° right-triangle cross section.",
          "A fillet weld is assumed to fail in shear through the throat.",
          "For welded connections, the material checks the connected member, weld, base-metal shear and block shear.",
          "The material gives the weld strength per unit length as qn = 0.707 t Fw, with Fw = 0.60Fu.",
          "For longitudinal and transverse welds, the material gives two connection-strength expressions and instructs using the larger value.",
          "Eccentrically loaded welded connections require consideration of direct and moment-related effects on the weld group."
        ],
        formulas: [
          "qn = 0.707 t Fw",
          "Fw = 0.60 Fu",
          "Base-metal shear yield strength per unit length: qn = 0.60 Fy t",
          "Base-metal shear rupture strength per unit length: qn = 0.60 Fu t",
          "Block shear: Rn = 0.6 Fu Anv + Fu Ant",
          "Block shear alternative: Rn = 0.6 Fy Agv + Fu Ant"
        ]
      }
    }

  ],


  reinforcedConcrete: [

   {
     name: "Fundamentals of Reinforced Concrete",
     description:
       "Basic reinforced concrete behavior and design philosophy."
   },

   {
     name: "Materials & Properties",
     description:
       "Concrete and reinforcement properties relevant to structural design."
   },

   {
     name: "Flexure of Reinforced Concrete",
     description:
       "Internal forces, strain compatibility, and flexural behavior."
   },

   {
     name: "Singly Reinforced Beams",
     description:
       "Analysis and design of beams with tension reinforcement."
   },

   {
     name: "Doubly Reinforced Beams",
     description:
       "Beams using reinforcement in both tension and compression zones."
   },

   {
     name: "Shear",
     description:
       "Shear behavior and reinforcement in reinforced concrete members."
   },

   {
     name: "Development & Anchorage",
     description:
       "Bond, development, anchorage, hooks, and reinforcement detailing."
   },

   {
     name: "Columns",
     description:
       "Axial load, bending, interaction, and reinforced concrete columns."
   },

   {
     name: "Slender Columns",
     description:
       "Second-order effects and slenderness considerations."
   },

   {
     name: "One-Way Slabs",
     description:
       "Analysis and design concepts for one-way slab systems."
   },

   {
     name: "Two-Way Slabs",
     description:
       "Two-way load distribution and slab behavior."
   },

   {
     name: "Footings",
     description:
       "Foundation behavior, bearing, flexure, and shear."
   },

   {
     name: "Serviceability",
     description:
       "Deflection, cracking, and service-level performance."
   }

 ],


 prestressedConcrete: [

   {
     name: "Fundamentals of Prestressing",
     description:
       "Basic principles and structural behavior of prestressed concrete."
   },

   {
     name: "Prestressing Systems",
     description:
       "Pretensioning, post-tensioning, and basic prestressing systems."
   },

   {
     name: "Materials",
     description:
       "Concrete and prestressing steel properties."
   },

   {
     name: "Concrete Stress Due to Prestress",
     description:
       "Stress distributions resulting from prestressing forces."
   },

   {
     name: "Prestress Losses",
     description:
       "Elastic shortening, creep, shrinkage, relaxation, and friction effects."
   },

   {
     name: "Flexural Behavior",
     description:
       "Behavior of prestressed members under flexural loading."
   },

   {
     name: "Flexural Strength",
     description:
       "Strength analysis of prestressed concrete flexural members."
   },

   {
     name: "Shear in Prestressed Concrete",
     description:
       "Shear behavior and resistance of prestressed members."
   },

   {
     name: "Serviceability",
     description:
       "Stress, cracking, deflection, and service-level considerations."
   },

   {
     name: "Detailing & Applications",
     description:
       "Prestressing details and common structural applications."
   }

 ]
};

/* =========================================================
  PAGE NAVIGATION
========================================================= */

function showPage(pageId) {

 document
   .querySelectorAll(".page")
   .forEach(page => {

     page.classList.remove(
       "active-page"
     );

   });


 const page =
   document.getElementById(pageId);


 if (!page) {

   console.warn(
     "Page not found:",
     pageId
   );

   return;

 }


 page.classList.add(
   "active-page"
 );


 window.scrollTo({
   top: 0,
   behavior: "smooth"
 });


 if (
   pageId === "homePage"
 ) {

   renderEngineeringDashboard();

 }


 if (
   pageId === "coachPage"
 ) {

   renderCoachOverview();

 }


 if (
   pageId === "adaptivePage"
 ) {

   renderAdaptivePage();

 }


 if (
   pageId === "tutorPage"
 ) {

   initializeTutor();

 }


 if (
   pageId === "formulaPage"
 ) {

   renderFormulaLibrary();

 }


 if (
   pageId === "solverPage"
 ) {

   updateSolverProblems();

 }

}


/* =========================================================
  REGISTRATION
========================================================= */

function registerStudent() {

 const input =
   document.getElementById(
     "studentName"
   );


 const name =
   input.value.trim();


 if (!name) {

   alert(
     "Please enter your name first 😊"
   );

   input.focus();

   return;

 }


 data.name =
   name;


 saveData();


 updateStudentNameDisplays();


 showPage(
   "homePage"
 );

}


function updateStudentNameDisplays() {

 const name =
   data.name ||
   "ENGINEER";


 const homeName =
   document.getElementById(
     "homeStudentName"
   );


 if (homeName) {

   homeName.textContent =
     name.toUpperCase();

 }


 const tutorName =
   document.getElementById(
     "tutorStudentName"
   );


 if (tutorName) {

   tutorName.textContent =
     name.toUpperCase();

 }

}


function editStudentName() {

 const newName =
   prompt(
     "Enter your new name:",
     data.name || ""
   );


 if (
   newName === null
 ) {

   return;

 }


 const cleaned =
   newName.trim();


 if (!cleaned) {

   alert(
     "Name cannot be empty."
   );

   return;

 }


 data.name =
   cleaned;


 saveData();

 updateStudentNameDisplays();

}


/* =========================================================
  RESET EVERYTHING
========================================================= */

function resetAllData() {

 const confirmed =
   confirm(
     "This will delete your name, quiz history, mistakes, progress, tutor history, and solver history.\n\nAre you sure?"
   );


 if (!confirmed) {

   return;

 }


 localStorage.removeItem(
   STORAGE_KEY
 );


 data =
   createDefaultData();


 location.reload();

}


/* =========================================================
  SUBJECT PAGE
========================================================= */

function renderSubjectTopics() {

 renderTopicList(
   "steelTopics",
   "steel"
 );

 renderTopicList(
   "reinforcedConcreteTopics",
   "reinforcedConcrete"
 );

 renderTopicList(
   "prestressedConcreteTopics",
   "prestressedConcrete"
 );

}


function renderTopicList(
 elementId,
 subject
) {

 const container =
   document.getElementById(
     elementId
   );


 if (!container) {

   return;

 }


 const topics =
   subjectTopics[subject] || [];


 container.innerHTML =
   topics.map(
     (topic, index) => {

       const reviewed =
         isTopicReviewed(
           subject,
           topic.name
         );


       return `

         <div
           class="topic-item"
           onclick="openTopicReview('${subject}', ${index})"
         >

           <span>
             ${escapeHTML(topic.name)}
           </span>

           <span class="topic-status">
             ${reviewed ? "✓" : "›"}
           </span>

         </div>

       `;

     }
   ).join("");

}


function toggleSubjectTopics(
 elementId,
 button
) {

 const container =
   document.getElementById(
     elementId
   );


 if (!container) {

   return;

 }


 const opening =
   !container.classList.contains(
     "open"
   );


 container.classList.toggle(
   "open"
 );


 button.innerHTML =
   opening
     ? "Hide Topics ↑"
     : "View Topics ↓";

}


function isTopicReviewed(
 subject,
 topic
) {

 return data.completedTopics
   .some(
     item =>
       item.subject === subject &&
       item.topic === topic
   );

}


/* =========================================================
  TOPIC REVIEW
========================================================= */

function openTopicReview(
 subject,
 topicIndex
) {

 const topic =
   subjectTopics[subject]?.[
     topicIndex
   ];


 if (!topic) {

   return;

 }


 const title =
   document.getElementById(
     "reviewPanelTitle"
   );


 const content =
   document.getElementById(
     "reviewPanelContent"
   );


 title.textContent =
   topic.name;


 const reviewed =
   isTopicReviewed(
     subject,
     topic.name
   );


 const studyContent =
   topic.content || {};


 const keyPoints =
   studyContent.keyPoints || [];


 const formulas =
   studyContent.formulas || [];


 content.innerHTML = `

   <div class="review-content">

     <span class="eyebrow">
       ${formatSubjectName(subject)}
       ${topic.syllabusWeek ? ` • ${escapeHTML(topic.syllabusWeek)}` : ""}
     </span>

     <h3>
       ${escapeHTML(topic.name)}
     </h3>

     <p>
       ${escapeHTML(topic.description)}
     </p>

     ${
       studyContent.overview
         ? `
           <div class="review-formula">
             <strong>Reviewer Focus</strong>
             <br><br>
             ${escapeHTML(studyContent.overview)}
           </div>
         `
         : ""
     }

     ${
       keyPoints.length
         ? `
           <h3>Key points from the Steel Design PDF</h3>
           <ul>
             ${keyPoints.map(
               point =>
                 `<li>${escapeHTML(point)}</li>`
             ).join("")}
           </ul>
         `
         : ""
     }

     ${
       formulas.length
         ? `
           <h3>Key relationships to review</h3>
           <div class="review-formula">
             ${formulas.map(
               formula =>
                 `<div style="margin-bottom:10px;"><code>${escapeHTML(formula)}</code></div>`
             ).join("")}
           </div>
         `
         : ""
     }

     <h3>
       Study checklist
     </h3>

     <ul>

       <li>
         Understand the physical behavior described in the topic.
       </li>

       <li>
         Identify the governing limit state or structural behavior.
       </li>

       <li>
         Keep units consistent throughout calculations.
       </li>

       <li>
         Apply the applicable NSCP/AISC provision used in the course.
       </li>

       <li>
         Work through the sample problems in the source PDF for this topic.
       </li>

     </ul>

     <div class="review-formula">

       📌 Study Tip

       <br><br>

       Don't memorize an equation first.
       Understand what each variable represents
       and what physical behavior the equation describes.

     </div>

     <button
       class="primary-btn mark-reviewed-btn"
       onclick="markTopicReviewed('${subject}', '${escapeAttribute(topic.name)}')"
     >

       ${reviewed
         ? "✓ Reviewed"
         : "Mark as Reviewed"}

     </button>

   </div>

 `;


 document
   .getElementById(
     "reviewPanel"
   )
   .classList.add("open");


 document
   .getElementById(
     "panelOverlay"
   )
   .classList.add("open");

}

function closeReviewPanel() {

 document
   .getElementById(
     "reviewPanel"
   )
   .classList.remove("open");


 document
   .getElementById(
     "panelOverlay"
   )
   .classList.remove("open");

}


function markTopicReviewed(
 subject,
 topic
) {

 const exists =
   isTopicReviewed(
     subject,
     topic
   );


 if (!exists) {

   data.completedTopics.push({
     subject,
     topic,
     date:
       new Date().toISOString()
   });

 }


 if (
   !data.progress[subject]
 ) {

   data.progress[subject] =
     {};

 }


 if (
   !data.progress[subject][topic]
 ) {

   data.progress[subject][topic] =
     {};

 }


 data.progress[subject][topic]
   .reviewed = true;


 data.progress[subject][topic]
   .lastReviewed =
     new Date().toISOString();


 saveData();


 renderSubjectTopics();

 closeReviewPanel();

}


/* =========================================================
  QUIZ QUESTION BANK
========================================================= */

const questionBank = [
 {
   "id": "steel-fundamentals-001",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "What does the elastic modulus E represent in structural steel for fundamentals of steel design in steel design?",
   "options": [
     "A specified stress associated with the onset of yielding",
     "It permits substantial inelastic deformation before fracture",
     "The slope relating normal stress to elastic normal strain",
     "Its ability to absorb energy before fracture"
   ],
   "correct": 2,
   "explanation": "E describes the elastic stiffness of the material."
 },
 {
   "id": "steel-fundamentals-002",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "What does yield strength identify in structural steel for fundamentals of steel design in steel design?",
   "options": [
     "It permits substantial inelastic deformation before fracture",
     "A specified stress associated with the onset of yielding",
     "Its ability to absorb energy before fracture",
     "Locked-in stress remaining after fabrication or cooling"
   ],
   "correct": 1,
   "explanation": "Yield strength is a key limit-state material property."
 },
 {
   "id": "steel-fundamentals-003",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "Why is ductility important in structural steel for fundamentals of steel design in steel design?",
   "options": [
     "Its ability to absorb energy before fracture",
     "Locked-in stress remaining after fabrication or cooling",
     "It permits substantial inelastic deformation before fracture",
     "The full cross-sectional area before deducting holes"
   ],
   "correct": 2,
   "explanation": "Ductility can provide deformation capacity and redistribution."
 },
 {
   "id": "steel-fundamentals-004",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "What does toughness of structural steel describe for fundamentals of steel design in steel design?",
   "options": [
     "Locked-in stress remaining after fabrication or cooling",
     "The full cross-sectional area before deducting holes",
     "Its ability to absorb energy before fracture",
     "It controls elastic flexural stiffness and contributes to bending resistance"
   ],
   "correct": 2,
   "explanation": "Toughness is associated with the area under the stress-strain response to fracture."
 },
 {
   "id": "steel-fundamentals-005",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "What is residual stress in a fabricated steel member for fundamentals of steel design in steel design?",
   "options": [
     "The full cross-sectional area before deducting holes",
     "Locked-in stress remaining after fabrication or cooling",
     "It controls elastic flexural stiffness and contributes to bending resistance",
     "It relates bending moment to extreme-fiber bending stress"
   ],
   "correct": 1,
   "explanation": "Fabrication processes can leave self-equilibrating residual stresses."
 },
 {
   "id": "steel-fundamentals-006",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "What is the gross area of a steel tension member for fundamentals of steel design in steel design?",
   "options": [
     "It controls elastic flexural stiffness and contributes to bending resistance",
     "The full cross-sectional area before deducting holes",
     "It relates bending moment to extreme-fiber bending stress",
     "Local stress can exceed the nominal average stress"
   ],
   "correct": 1,
   "explanation": "Gross area is the unreduced section area."
 },
 {
   "id": "steel-fundamentals-007",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "Why is moment of inertia important for a steel beam for fundamentals of steel design in steel design?",
   "options": [
     "It relates bending moment to extreme-fiber bending stress",
     "Local stress can exceed the nominal average stress",
     "It controls elastic flexural stiffness and contributes to bending resistance",
     "A condition beyond which required strength or performance is unacceptable"
   ],
   "correct": 2,
   "explanation": "Larger I generally means greater EI and lower elastic curvature."
 },
 {
   "id": "steel-fundamentals-008",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "What is the role of section modulus in elastic bending for fundamentals of steel design in steel design?",
   "options": [
     "Local stress can exceed the nominal average stress",
     "It relates bending moment to extreme-fiber bending stress",
     "A condition beyond which required strength or performance is unacceptable",
     "High strength with relatively low self-weight can reduce structural dead load"
   ],
   "correct": 1,
   "explanation": "Elastic bending stress is M/S."
 },
 {
   "id": "steel-fundamentals-009",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "Why is a stress concentration important near a hole or notch for fundamentals of steel design in steel design?",
   "options": [
     "A condition beyond which required strength or performance is unacceptable",
     "Local stress can exceed the nominal average stress",
     "High strength with relatively low self-weight can reduce structural dead load",
     "Significant permanent deformation after yielding"
   ],
   "correct": 1,
   "explanation": "Discontinuities disturb the stress flow."
 },
 {
   "id": "steel-fundamentals-010",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "What is a structural design limit state for fundamentals of steel design in steel design?",
   "options": [
     "A condition beyond which required strength or performance is unacceptable",
     "High strength with relatively low self-weight can reduce structural dead load",
     "Significant permanent deformation after yielding",
     "They can create eccentricity and amplify bending under axial load"
   ],
   "correct": 0,
   "explanation": "Limit states organize checks for strength, stability, and serviceability."
 },
 {
   "id": "steel-fundamentals-011",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "Why is steel strength-to-weight ratio useful for long spans for fundamentals of steel design in steel design?",
   "options": [
     "High strength with relatively low self-weight can reduce structural dead load",
     "Significant permanent deformation after yielding",
     "They can create eccentricity and amplify bending under axial load",
     "Deformations at a common interface remain compatible"
   ],
   "correct": 0,
   "explanation": "Lower self-weight can improve span efficiency."
 },
 {
   "id": "steel-fundamentals-012",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "What characterizes plastic behavior of structural steel for fundamentals of steel design in steel design?",
   "options": [
     "They can create eccentricity and amplify bending under axial load",
     "Deformations at a common interface remain compatible",
     "Significant permanent deformation after yielding",
     "Actual properties can differ from nominal values"
   ],
   "correct": 2,
   "explanation": "Plastic response occurs beyond the elastic range."
 },
 {
   "id": "steel-fundamentals-013",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "Why are initial geometric imperfections relevant to steel compression members for fundamentals of steel design in steel design?",
   "options": [
     "They can create eccentricity and amplify bending under axial load",
     "Deformations at a common interface remain compatible",
     "Actual properties can differ from nominal values",
     "The slope relating normal stress to elastic normal strain"
   ],
   "correct": 0,
   "explanation": "Real members are not perfectly straight."
 },
 {
   "id": "steel-fundamentals-014",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "What does strain compatibility mean in a bonded composite section for fundamentals of steel design in steel design?",
   "options": [
     "Actual properties can differ from nominal values",
     "Deformations at a common interface remain compatible",
     "The slope relating normal stress to elastic normal strain",
     "A specified stress associated with the onset of yielding"
   ],
   "correct": 1,
   "explanation": "Compatibility links strains among materials that act together."
 },
 {
   "id": "steel-fundamentals-015",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "Why must material variability be considered in structural steel design for fundamentals of steel design in steel design?",
   "options": [
     "Actual properties can differ from nominal values",
     "The slope relating normal stress to elastic normal strain",
     "A specified stress associated with the onset of yielding",
     "It permits substantial inelastic deformation before fracture"
   ],
   "correct": 0,
   "explanation": "Design resistance uses specified properties with reliability provisions."
 },
 {
   "id": "steel-loads-001",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "Which action is a dead load for loads & load combinations in steel design?",
   "options": [
     "Permanent self-weight or fixed component weight",
     "Movable occupancy-related loading",
     "Wind can produce lateral pressure, suction, and uplift",
     "It can produce significant inertial forces and lateral drift"
   ],
   "correct": 0,
   "explanation": "Dead load is normally permanent gravity loading."
 },
 {
   "id": "steel-loads-002",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "Which action is normally a live load for loads & load combinations in steel design?",
   "options": [
     "Wind can produce lateral pressure, suction, and uplift",
     "Movable occupancy-related loading",
     "It can produce significant inertial forces and lateral drift",
     "The portion of floor or roof load assigned to a supporting member"
   ],
   "correct": 1,
   "explanation": "Live load varies with use and occupancy."
 },
 {
   "id": "steel-loads-003",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "Why must wind load be considered in building design for loads & load combinations in steel design?",
   "options": [
     "It can produce significant inertial forces and lateral drift",
     "The portion of floor or roof load assigned to a supporting member",
     "Wind can produce lateral pressure, suction, and uplift",
     "The continuous route by which loads are transferred to the ground"
   ],
   "correct": 2,
   "explanation": "Wind creates non-gravity actions that must follow a load path."
 },
 {
   "id": "steel-loads-004",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "Why is earthquake action important in structural design for loads & load combinations in steel design?",
   "options": [
     "The portion of floor or roof load assigned to a supporting member",
     "It can produce significant inertial forces and lateral drift",
     "The continuous route by which loads are transferred to the ground",
     "To provide reliability against uncertainty in nominal loading"
   ],
   "correct": 1,
   "explanation": "Seismic response depends on mass, stiffness, damping, and ground motion."
 },
 {
   "id": "steel-loads-005",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "What does tributary area represent for loads & load combinations in steel design?",
   "options": [
     "The continuous route by which loads are transferred to the ground",
     "To provide reliability against uncertainty in nominal loading",
     "The portion of floor or roof load assigned to a supporting member",
     "Evaluating expected in-use performance such as deflection"
   ],
   "correct": 2,
   "explanation": "Tributary area is a practical load-distribution concept."
 },
 {
   "id": "steel-loads-006",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "What is a structural load path for loads & load combinations in steel design?",
   "options": [
     "To provide reliability against uncertainty in nominal loading",
     "The continuous route by which loads are transferred to the ground",
     "Evaluating expected in-use performance such as deflection",
     "Resistance against failure under appropriately factored actions"
   ],
   "correct": 1,
   "explanation": "A complete load path is essential for structural stability."
 },
 {
   "id": "steel-loads-007",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "What is the purpose of a load factor in strength design for loads & load combinations in steel design?",
   "options": [
     "To provide reliability against uncertainty in nominal loading",
     "Evaluating expected in-use performance such as deflection",
     "Resistance against failure under appropriately factored actions",
     "Internal force and bending"
   ],
   "correct": 0,
   "explanation": "Load factors account for uncertainty and variability in actions."
 },
 {
   "id": "steel-loads-008",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "What is a service load combination used for for loads & load combinations in steel design?",
   "options": [
     "Evaluating expected in-use performance such as deflection",
     "Resistance against failure under appropriately factored actions",
     "Internal force and bending",
     "wL"
   ],
   "correct": 0,
   "explanation": "Serviceability checks use appropriate in-use load levels."
 },
 {
   "id": "steel-loads-009",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "What is a strength load combination intended to evaluate for loads & load combinations in steel design?",
   "options": [
     "Internal force and bending",
     "Resistance against failure under appropriately factored actions",
     "wL",
     "PL/4"
   ],
   "correct": 1,
   "explanation": "Strength combinations address ultimate limit states."
 },
 {
   "id": "steel-loads-010",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "What structural effect can restrained thermal movement create for loads & load combinations in steel design?",
   "options": [
     "wL",
     "Internal force and bending",
     "PL/4",
     "They can create dynamic effects larger than equivalent static loading"
   ],
   "correct": 1,
   "explanation": "Restraint converts free thermal movement into force."
 },
 {
   "id": "steel-loads-011",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "How is the resultant of a uniform line load found for loads & load combinations in steel design?",
   "options": [
     "PL/4",
     "wL",
     "They can create dynamic effects larger than equivalent static loading",
     "Temporary stages can have different support and load paths"
   ],
   "correct": 1,
   "explanation": "The total load is intensity multiplied by loaded length."
 },
 {
   "id": "steel-loads-012",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "For a central point load P on a simple span L, what is the maximum moment for loads & load combinations in steel design?",
   "options": [
     "They can create dynamic effects larger than equivalent static loading",
     "PL/4",
     "Temporary stages can have different support and load paths",
     "Actual actions can differ from nominal estimates"
   ],
   "correct": 1,
   "explanation": "The midspan point-load moment is PL/4."
 },
 {
   "id": "steel-loads-013",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "Why can impact loads require special consideration for loads & load combinations in steel design?",
   "options": [
     "They can create dynamic effects larger than equivalent static loading",
     "Temporary stages can have different support and load paths",
     "Actual actions can differ from nominal estimates",
     "Permanent self-weight or fixed component weight"
   ],
   "correct": 0,
   "explanation": "Impact introduces transient dynamic response."
 },
 {
   "id": "steel-loads-014",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "Why must construction loads sometimes be checked separately for loads & load combinations in steel design?",
   "options": [
     "Actual actions can differ from nominal estimates",
     "Permanent self-weight or fixed component weight",
     "Temporary stages can have different support and load paths",
     "Movable occupancy-related loading"
   ],
   "correct": 2,
   "explanation": "Construction configurations can govern before final completion."
 },
 {
   "id": "steel-loads-015",
   "subject": "steel",
   "topic": "Introduction to Steel Structures",
   "type": "mcq",
   "prompt": "Why is load uncertainty considered in design for loads & load combinations in steel design?",
   "options": [
     "Permanent self-weight or fixed component weight",
     "Actual actions can differ from nominal estimates",
     "Movable occupancy-related loading",
     "Wind can produce lateral pressure, suction, and uplift"
   ],
   "correct": 1,
   "explanation": "Reliability provisions account for uncertainty in load magnitude and occurrence."
 },
 {
   "id": "steel-tension-001",
   "subject": "steel",
   "topic": "Tension Members",
   "type": "mcq",
   "prompt": "What is the gross area of a steel tension member for tension members in steel design?",
   "options": [
     "It represents the reduced area remaining after connection holes",
     "The full cross-sectional area before deducting holes",
     "Nonuniform force development when only part of a cross-section is directly connected",
     "A connected block failing along combined tension and shear paths"
   ],
   "correct": 1,
   "explanation": "Gross area is the unreduced section area."
 },
 {
   "id": "steel-tension-002",
   "subject": "steel",
   "topic": "Tension Members",
   "type": "mcq",
   "prompt": "Why is net area important in a bolted tension member for tension members in steel design?",
   "options": [
     "Nonuniform force development when only part of a cross-section is directly connected",
     "A connected block failing along combined tension and shear paths",
     "They remove material from the critical section",
     "It represents the reduced area remaining after connection holes"
   ],
   "correct": 3,
   "explanation": "Net section fracture can govern tensile resistance."
 },
 {
   "id": "steel-tension-003",
   "subject": "steel",
   "topic": "Tension Members",
   "type": "mcq",
   "prompt": "What is shear lag in a tension member for tension members in steel design?",
   "options": [
     "A connected block failing along combined tension and shear paths",
     "They remove material from the critical section",
     "Plastic deformation begins when the specified yield condition is reached",
     "Nonuniform force development when only part of a cross-section is directly connected"
   ],
   "correct": 3,
   "explanation": "Shear lag can reduce effective tensile resistance."
 },
 {
   "id": "steel-tension-004",
   "subject": "steel",
   "topic": "Tension Members",
   "type": "mcq",
   "prompt": "What does block shear describe for tension members in steel design?",
   "options": [
     "They remove material from the critical section",
     "Plastic deformation begins when the specified yield condition is reached",
     "A connected block failing along combined tension and shear paths",
     "Rupture of the reduced section after sufficient tensile stress and strain"
   ],
   "correct": 2,
   "explanation": "Block shear is a connection-region limit state."
 },
 {
   "id": "steel-tension-005",
   "subject": "steel",
   "topic": "Tension Members",
   "type": "mcq",
   "prompt": "Why are bolt holes deducted from a tension net section for tension members in steel design?",
   "options": [
     "Plastic deformation begins when the specified yield condition is reached",
     "Rupture of the reduced section after sufficient tensile stress and strain",
     "Local stress can exceed the nominal average stress",
     "They remove material from the critical section"
   ],
   "correct": 3,
   "explanation": "Removing material reduces net tensile area."
 },
 {
   "id": "steel-tension-006",
   "subject": "steel",
   "topic": "Tension Members",
   "type": "mcq",
   "prompt": "What is tensile yielding of a steel member for tension members in steel design?",
   "options": [
     "Rupture of the reduced section after sufficient tensile stress and strain",
     "Local stress can exceed the nominal average stress",
     "It provides material around the hole to resist tear-out and related limit states",
     "Plastic deformation begins when the specified yield condition is reached"
   ],
   "correct": 3,
   "explanation": "Yielding is a material strength limit state."
 },
 {
   "id": "steel-tension-007",
   "subject": "steel",
   "topic": "Tension Members",
   "type": "mcq",
   "prompt": "What is tensile fracture of a steel net section for tension members in steel design?",
   "options": [
     "Rupture of the reduced section after sufficient tensile stress and strain",
     "Local stress can exceed the nominal average stress",
     "It provides material around the hole to resist tear-out and related limit states",
     "For fixed thickness, increasing width increases gross area"
   ],
   "correct": 0,
   "explanation": "Fracture is distinct from initial yielding."
 },
 {
   "id": "steel-tension-008",
   "subject": "steel",
   "topic": "Tension Members",
   "type": "mcq",
   "prompt": "Why is a stress concentration important near a hole or notch for tension members in steel design?",
   "options": [
     "It provides material around the hole to resist tear-out and related limit states",
     "For fixed thickness, increasing width increases gross area",
     "Local stress can exceed the nominal average stress",
     "Increasing thickness increases gross area and generally improves resistance"
   ],
   "correct": 2,
   "explanation": "Discontinuities disturb the stress flow."
 },
 {
   "id": "steel-tension-009",
   "subject": "steel",
   "topic": "Tension Members",
   "type": "mcq",
   "prompt": "Why is edge distance important in a bolted plate for tension members in steel design?",
   "options": [
     "For fixed thickness, increasing width increases gross area",
     "Increasing thickness increases gross area and generally improves resistance",
     "It provides material around the hole to resist tear-out and related limit states",
     "P/A"
   ],
   "correct": 2,
   "explanation": "Insufficient edge distance can weaken force transfer."
 },
 {
   "id": "steel-tension-010",
   "subject": "steel",
   "topic": "Tension Members",
   "type": "mcq",
   "prompt": "How does plate width affect gross tension area for tension members in steel design?",
   "options": [
     "Increasing thickness increases gross area and generally improves resistance",
     "P/A",
     "For fixed thickness, increasing width increases gross area",
     "The joint can fail by bearing, tear-out, rupture, or block shear"
   ],
   "correct": 2,
   "explanation": "Gross plate area is width times thickness."
 },
 {
   "id": "steel-tension-011",
   "subject": "steel",
   "topic": "Tension Members",
   "type": "mcq",
   "prompt": "How does plate thickness affect a flat tension plate for tension members in steel design?",
   "options": [
     "P/A",
     "The joint can fail by bearing, tear-out, rupture, or block shear",
     "Increasing thickness increases gross area and generally improves resistance",
     "It permits substantial inelastic deformation before fracture"
   ],
   "correct": 2,
   "explanation": "Area equals width times thickness."
 },
 {
   "id": "steel-tension-012",
   "subject": "steel",
   "topic": "Tension Members",
   "type": "mcq",
   "prompt": "How is average axial tensile stress calculated for tension members in steel design?",
   "options": [
     "The joint can fail by bearing, tear-out, rupture, or block shear",
     "P/A",
     "It permits substantial inelastic deformation before fracture",
     "The connection must transmit the member force without exceeding any applicable limit state"
   ],
   "correct": 1,
   "explanation": "Average stress equals axial force divided by area."
 },
 {
   "id": "steel-tension-013",
   "subject": "steel",
   "topic": "Tension Members",
   "type": "mcq",
   "prompt": "Why must a steel tension connection be checked separately from the member for tension members in steel design?",
   "options": [
     "It permits substantial inelastic deformation before fracture",
     "The joint can fail by bearing, tear-out, rupture, or block shear",
     "The connection must transmit the member force without exceeding any applicable limit state",
     "The full cross-sectional area before deducting holes"
   ],
   "correct": 1,
   "explanation": "Connections have local limit states."
 },
 {
   "id": "steel-tension-014",
   "subject": "steel",
   "topic": "Tension Members",
   "type": "mcq",
   "prompt": "Why is ductility important in structural steel for tension members in steel design?",
   "options": [
     "The connection must transmit the member force without exceeding any applicable limit state",
     "It permits substantial inelastic deformation before fracture",
     "The full cross-sectional area before deducting holes",
     "It represents the reduced area remaining after connection holes"
   ],
   "correct": 1,
   "explanation": "Ductility can provide deformation capacity and redistribution."
 },
 {
   "id": "steel-tension-015",
   "subject": "steel",
   "topic": "Tension Members",
   "type": "mcq",
   "prompt": "Why is force transfer important at a steel connection for tension members in steel design?",
   "options": [
     "The full cross-sectional area before deducting holes",
     "The connection must transmit the member force without exceeding any applicable limit state",
     "It represents the reduced area remaining after connection holes",
     "Nonuniform force development when only part of a cross-section is directly connected"
   ],
   "correct": 1,
   "explanation": "A continuous force path is required."
 },
 {
   "id": "steel-compression-001",
   "subject": "steel",
   "topic": "Axially Loaded Compression Members",
   "type": "mcq",
   "prompt": "What does Euler theory predict for an ideal slender column for compression members in steel design?",
   "options": [
     "An equivalent buckling length that reflects end restraint",
     "Its elastic critical buckling load",
     "r = sqrt(I/A)",
     "Greater slenderness generally increases susceptibility to buckling"
   ],
   "correct": 1,
   "explanation": "Euler theory describes ideal elastic instability."
 },
 {
   "id": "steel-compression-002",
   "subject": "steel",
   "topic": "Axially Loaded Compression Members",
   "type": "mcq",
   "prompt": "What does effective length represent for a column for compression members in steel design?",
   "options": [
     "An equivalent buckling length that reflects end restraint",
     "r = sqrt(I/A)",
     "Greater slenderness generally increases susceptibility to buckling",
     "It has lower radius of gyration or inertia"
   ],
   "correct": 0,
   "explanation": "Effective length incorporates boundary conditions."
 },
 {
   "id": "steel-compression-003",
   "subject": "steel",
   "topic": "Axially Loaded Compression Members",
   "type": "mcq",
   "prompt": "How is radius of gyration related to I and A for compression members in steel design?",
   "options": [
     "r = sqrt(I/A)",
     "Greater slenderness generally increases susceptibility to buckling",
     "It has lower radius of gyration or inertia",
     "Instability of an individual slender plate element"
   ],
   "correct": 0,
   "explanation": "Radius of gyration describes the distribution of area relative to an axis."
 },
 {
   "id": "steel-compression-004",
   "subject": "steel",
   "topic": "Axially Loaded Compression Members",
   "type": "mcq",
   "prompt": "Why is column slenderness important for compression members in steel design?",
   "options": [
     "It has lower radius of gyration or inertia",
     "Greater slenderness generally increases susceptibility to buckling",
     "Instability of an individual slender plate element",
     "Buckling that occurs while part of the section has yielded"
   ],
   "correct": 1,
   "explanation": "Stability becomes more critical as KL/r increases."
 },
 {
   "id": "steel-compression-005",
   "subject": "steel",
   "topic": "Axially Loaded Compression Members",
   "type": "mcq",
   "prompt": "Why can the weak axis govern column buckling for compression members in steel design?",
   "options": [
     "Instability of an individual slender plate element",
     "Buckling that occurs while part of the section has yielded",
     "It has lower radius of gyration or inertia",
     "It creates an initial eccentricity that can be amplified by axial load"
   ],
   "correct": 2,
   "explanation": "Lower stiffness produces lower buckling resistance."
 },
 {
   "id": "steel-compression-006",
   "subject": "steel",
   "topic": "Axially Loaded Compression Members",
   "type": "mcq",
   "prompt": "What is local buckling of a steel section for compression members in steel design?",
   "options": [
     "Buckling that occurs while part of the section has yielded",
     "It creates an initial eccentricity that can be amplified by axial load",
     "Locked-in stress remaining after fabrication or cooling",
     "Instability of an individual slender plate element"
   ],
   "correct": 3,
   "explanation": "Flanges and webs can buckle locally."
 },
 {
   "id": "steel-compression-007",
   "subject": "steel",
   "topic": "Axially Loaded Compression Members",
   "type": "mcq",
   "prompt": "What is inelastic buckling for compression members in steel design?",
   "options": [
     "Buckling that occurs while part of the section has yielded",
     "It creates an initial eccentricity that can be amplified by axial load",
     "Locked-in stress remaining after fabrication or cooling",
     "It restrains lateral movement and can reduce effective length"
   ],
   "correct": 0,
   "explanation": "It lies between purely elastic buckling and squash behavior."
 },
 {
   "id": "steel-compression-008",
   "subject": "steel",
   "topic": "Axially Loaded Compression Members",
   "type": "mcq",
   "prompt": "Why does initial crookedness matter in a column for compression members in steel design?",
   "options": [
     "It creates an initial eccentricity that can be amplified by axial load",
     "Locked-in stress remaining after fabrication or cooling",
     "It restrains lateral movement and can reduce effective length",
     "The load at which an idealized equilibrium configuration becomes unstable"
   ],
   "correct": 0,
   "explanation": "Real compression members are imperfect."
 },
 {
   "id": "steel-compression-009",
   "subject": "steel",
   "topic": "Axially Loaded Compression Members",
   "type": "mcq",
   "prompt": "What is residual stress in a fabricated steel member for compression members in steel design?",
   "options": [
     "It restrains lateral movement and can reduce effective length",
     "The load at which an idealized equilibrium configuration becomes unstable",
     "Section inertia is a relevant compression members concept that must be evaluated in its appropriate structural limit state",
     "Locked-in stress remaining after fabrication or cooling"
   ],
   "correct": 3,
   "explanation": "Fabrication processes can leave self-equilibrating residual stresses."
 },
 {
   "id": "steel-compression-010",
   "subject": "steel",
   "topic": "Axially Loaded Compression Members",
   "type": "mcq",
   "prompt": "How can bracing improve column stability for compression members in steel design?",
   "options": [
     "The load at which an idealized equilibrium configuration becomes unstable",
     "It restrains lateral movement and can reduce effective length",
     "Section inertia is a relevant compression members concept that must be evaluated in its appropriate structural limit state",
     "The influence of end restraint on buckling length"
   ],
   "correct": 1,
   "explanation": "Bracing improves stability by limiting buckling deformation."
 },
 {
   "id": "steel-compression-011",
   "subject": "steel",
   "topic": "Axially Loaded Compression Members",
   "type": "mcq",
   "prompt": "What is a critical buckling load for compression members in steel design?",
   "options": [
     "Section inertia is a relevant compression members concept that must be evaluated in its appropriate structural limit state",
     "The influence of end restraint on buckling length",
     "A compressive load associated with yielding of the full cross-section",
     "The load at which an idealized equilibrium configuration becomes unstable"
   ],
   "correct": 3,
   "explanation": "It marks the onset of elastic instability in the ideal model."
 },
 {
   "id": "steel-compression-012",
   "subject": "steel",
   "topic": "Axially Loaded Compression Members",
   "type": "mcq",
   "prompt": "Which statement best describes section inertia in compression members for compression members in steel design?",
   "options": [
     "Section inertia is a relevant compression members concept that must be evaluated in its appropriate structural limit state",
     "The influence of end restraint on buckling length",
     "A compressive load associated with yielding of the full cross-section",
     "Axial load acting through lateral displacement"
   ],
   "correct": 0,
   "explanation": "Section inertia is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-compression-013",
   "subject": "steel",
   "topic": "Axially Loaded Compression Members",
   "type": "mcq",
   "prompt": "What does the effective length factor K account for for compression members in steel design?",
   "options": [
     "A compressive load associated with yielding of the full cross-section",
     "Axial load acting through lateral displacement",
     "Its elastic critical buckling load",
     "The influence of end restraint on buckling length"
   ],
   "correct": 3,
   "explanation": "Le = KL."
 },
 {
   "id": "steel-compression-014",
   "subject": "steel",
   "topic": "Axially Loaded Compression Members",
   "type": "mcq",
   "prompt": "What is a squash load conceptually for compression members in steel design?",
   "options": [
     "Axial load acting through lateral displacement",
     "Its elastic critical buckling load",
     "An equivalent buckling length that reflects end restraint",
     "A compressive load associated with yielding of the full cross-section"
   ],
   "correct": 3,
   "explanation": "It represents a material-yielding limit rather than elastic buckling."
 },
 {
   "id": "steel-compression-015",
   "subject": "steel",
   "topic": "Axially Loaded Compression Members",
   "type": "mcq",
   "prompt": "What causes second-order bending in a compression member for compression members in steel design?",
   "options": [
     "Its elastic critical buckling load",
     "An equivalent buckling length that reflects end restraint",
     "r = sqrt(I/A)",
     "Axial load acting through lateral displacement"
   ],
   "correct": 3,
   "explanation": "The P-Delta effect adds moment to the first-order response."
 },
 {
   "id": "steel-flexure-001",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "What is the role of section modulus in elastic bending for flexural members in steel design?",
   "options": [
     "It controls elastic flexural stiffness and contributes to bending resistance",
     "It relates bending moment to extreme-fiber bending stress",
     "Lateral movement of the compression region coupled with beam twist",
     "The line where longitudinal bending stress is zero"
   ],
   "correct": 1,
   "explanation": "Elastic bending stress is M/S."
 },
 {
   "id": "steel-flexure-002",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Why is moment of inertia important for a steel beam for flexural members in steel design?",
   "options": [
     "Lateral movement of the compression region coupled with beam twist",
     "It controls elastic flexural stiffness and contributes to bending resistance",
     "The line where longitudinal bending stress is zero",
     "The moment associated with a fully yielded idealized cross-section"
   ],
   "correct": 1,
   "explanation": "Larger I generally means greater EI and lower elastic curvature."
 },
 {
   "id": "steel-flexure-003",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "What is lateral-torsional buckling of a steel beam for flexural members in steel design?",
   "options": [
     "The line where longitudinal bending stress is zero",
     "The moment associated with a fully yielded idealized cross-section",
     "Slender elements may locally buckle before full section strength develops",
     "Lateral movement of the compression region coupled with beam twist"
   ],
   "correct": 3,
   "explanation": "Unbraced beams can lose flexural capacity through this instability."
 },
 {
   "id": "steel-flexure-004",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "What is the neutral axis in elastic beam bending for flexural members in steel design?",
   "options": [
     "The line where longitudinal bending stress is zero",
     "The moment associated with a fully yielded idealized cross-section",
     "Slender elements may locally buckle before full section strength develops",
     "It is the flange most susceptible to lateral instability"
   ],
   "correct": 0,
   "explanation": "Stress changes sign across the neutral axis."
 },
 {
   "id": "steel-flexure-005",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "What does plastic moment represent for flexural members in steel design?",
   "options": [
     "Slender elements may locally buckle before full section strength develops",
     "It is the flange most susceptible to lateral instability",
     "The moment associated with a fully yielded idealized cross-section",
     "It increases the separation of material from the neutral axis"
   ],
   "correct": 2,
   "explanation": "Plastic analysis assumes the section develops a plastic stress distribution."
 },
 {
   "id": "steel-flexure-006",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Why does element compactness matter in steel flexure for flexural members in steel design?",
   "options": [
     "It is the flange most susceptible to lateral instability",
     "It increases the separation of material from the neutral axis",
     "Slender elements may locally buckle before full section strength develops",
     "M/S"
   ],
   "correct": 2,
   "explanation": "Element slenderness affects local buckling."
 },
 {
   "id": "steel-flexure-007",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Why is the compression flange important in lateral-torsional buckling for flexural members in steel design?",
   "options": [
     "It is the flange most susceptible to lateral instability",
     "It increases the separation of material from the neutral axis",
     "M/S",
     "PL/4"
   ],
   "correct": 0,
   "explanation": "Its restraint strongly affects beam stability."
 },
 {
   "id": "steel-flexure-008",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Why can increasing beam depth improve flexural efficiency for flexural members in steel design?",
   "options": [
     "M/S",
     "It increases the separation of material from the neutral axis",
     "PL/4",
     "wL²/8"
   ],
   "correct": 1,
   "explanation": "Greater depth can greatly increase I and S."
 },
 {
   "id": "steel-flexure-009",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "How is extreme-fiber elastic bending stress calculated for flexural members in steel design?",
   "options": [
     "PL/4",
     "M/S",
     "wL²/8",
     "EI"
   ],
   "correct": 1,
   "explanation": "Section modulus relates moment to elastic stress."
 },
 {
   "id": "steel-flexure-010",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "What is the maximum moment for a central point load on a simple beam for flexural members in steel design?",
   "options": [
     "wL²/8",
     "EI",
     "PL/4",
     "It carries much of the shear and connects the flanges"
   ],
   "correct": 2,
   "explanation": "For a central point load, Mmax = PL/4."
 },
 {
   "id": "steel-flexure-011",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "What is the maximum moment for a uniform load on a simple span for flexural members in steel design?",
   "options": [
     "EI",
     "It carries much of the shear and connects the flanges",
     "wL²/8",
     "A yielded region capable of substantial rotation at approximately plastic moment"
   ],
   "correct": 2,
   "explanation": "For a simple beam with uniform load, Mmax = wL²/8."
 },
 {
   "id": "steel-flexure-012",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "What controls elastic flexural stiffness of a steel beam for flexural members in steel design?",
   "options": [
     "It carries much of the shear and connects the flanges",
     "EI",
     "A yielded region capable of substantial rotation at approximately plastic moment",
     "It restrains lateral movement of the compression flange"
   ],
   "correct": 1,
   "explanation": "Flexural stiffness is the product of elastic modulus and moment of inertia."
 },
 {
   "id": "steel-flexure-013",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "What is the primary structural role of an I-beam web for flexural members in steel design?",
   "options": [
     "It carries much of the shear and connects the flanges",
     "A yielded region capable of substantial rotation at approximately plastic moment",
     "It restrains lateral movement of the compression flange",
     "It relates bending moment to extreme-fiber bending stress"
   ],
   "correct": 0,
   "explanation": "The web provides an efficient shear path."
 },
 {
   "id": "steel-flexure-014",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "What is a plastic hinge for flexural members in steel design?",
   "options": [
     "It restrains lateral movement of the compression flange",
     "It relates bending moment to extreme-fiber bending stress",
     "A yielded region capable of substantial rotation at approximately plastic moment",
     "It controls elastic flexural stiffness and contributes to bending resistance"
   ],
   "correct": 2,
   "explanation": "It is an idealization used in plastic analysis."
 },
 {
   "id": "steel-flexure-015",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "How does lateral bracing improve beam stability for flexural members in steel design?",
   "options": [
     "It relates bending moment to extreme-fiber bending stress",
     "It restrains lateral movement of the compression flange",
     "It controls elastic flexural stiffness and contributes to bending resistance",
     "Lateral movement of the compression region coupled with beam twist"
   ],
   "correct": 1,
   "explanation": "Bracing increases resistance to lateral-torsional buckling."
 },
 {
   "id": "steel-shear-001",
   "subject": "steel",
   "topic": "Shear in Beams",
   "type": "mcq",
   "prompt": "Which statement best describes web shear in shear in steel members for shear in steel members in steel design?",
   "options": [
     "Shear stress is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Web buckling is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Stiffeners is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Web shear is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Web shear is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-shear-002",
   "subject": "steel",
   "topic": "Shear in Beams",
   "type": "mcq",
   "prompt": "Which statement best describes shear stress in shear in steel members for shear in steel members in steel design?",
   "options": [
     "Web buckling is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Stiffeners is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Shear stress is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Web area is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Shear stress is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-shear-003",
   "subject": "steel",
   "topic": "Shear in Beams",
   "type": "mcq",
   "prompt": "Which statement best describes web buckling in shear in steel members for shear in steel members in steel design?",
   "options": [
     "Stiffeners is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Web area is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Shear flow is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Web buckling is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Web buckling is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-shear-004",
   "subject": "steel",
   "topic": "Shear in Beams",
   "type": "mcq",
   "prompt": "Which statement best describes stiffeners in shear in steel members for shear in steel members in steel design?",
   "options": [
     "Stiffeners is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Web area is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Shear flow is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Bearing at reaction is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Stiffeners is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-shear-005",
   "subject": "steel",
   "topic": "Shear in Beams",
   "type": "mcq",
   "prompt": "Which statement best describes web area in shear in steel members for shear in steel members in steel design?",
   "options": [
     "Shear flow is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Bearing at reaction is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Web opening is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Web area is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Web area is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-shear-006",
   "subject": "steel",
   "topic": "Shear in Beams",
   "type": "mcq",
   "prompt": "Which statement best describes shear flow in shear in steel members for shear in steel members in steel design?",
   "options": [
     "Bearing at reaction is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Web opening is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Diagonal compression is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Shear flow is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Shear flow is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-shear-007",
   "subject": "steel",
   "topic": "Shear in Beams",
   "type": "mcq",
   "prompt": "Which statement best describes bearing at reaction in shear in steel members for shear in steel members in steel design?",
   "options": [
     "Web opening is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Diagonal compression is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Bearing at reaction is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Shear yielding is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Bearing at reaction is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-shear-008",
   "subject": "steel",
   "topic": "Shear in Beams",
   "type": "mcq",
   "prompt": "Which statement best describes web opening in shear in steel members for shear in steel members in steel design?",
   "options": [
     "Diagonal compression is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Shear yielding is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Web opening is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Slender web is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Web opening is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-shear-009",
   "subject": "steel",
   "topic": "Shear in Beams",
   "type": "mcq",
   "prompt": "Which statement best describes diagonal compression in shear in steel members for shear in steel members in steel design?",
   "options": [
     "Shear yielding is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Slender web is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Diagonal compression is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Support shear is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Diagonal compression is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-shear-010",
   "subject": "steel",
   "topic": "Shear in Beams",
   "type": "mcq",
   "prompt": "Which statement best describes shear yielding in shear in steel members for shear in steel members in steel design?",
   "options": [
     "Shear yielding is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Slender web is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Support shear is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Shear diagram is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Shear yielding is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-shear-011",
   "subject": "steel",
   "topic": "Shear in Beams",
   "type": "mcq",
   "prompt": "Which statement best describes slender web in shear in steel members for shear in steel members in steel design?",
   "options": [
     "Slender web is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Support shear is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Shear diagram is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Transverse stiffener is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Slender web is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-shear-012",
   "subject": "steel",
   "topic": "Shear in Beams",
   "type": "mcq",
   "prompt": "Which statement best describes support shear in shear in steel members for shear in steel members in steel design?",
   "options": [
     "Shear diagram is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Transverse stiffener is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Shear-flexure interaction is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Support shear is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Support shear is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-shear-013",
   "subject": "steel",
   "topic": "Shear in Beams",
   "type": "mcq",
   "prompt": "Which statement best describes shear diagram in shear in steel members for shear in steel members in steel design?",
   "options": [
     "Transverse stiffener is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Shear-flexure interaction is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Web shear is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Shear diagram is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Shear diagram is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-shear-014",
   "subject": "steel",
   "topic": "Shear in Beams",
   "type": "mcq",
   "prompt": "Which statement best describes transverse stiffener in shear in steel members for shear in steel members in steel design?",
   "options": [
     "Shear-flexure interaction is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Web shear is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Transverse stiffener is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Shear stress is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Transverse stiffener is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-shear-015",
   "subject": "steel",
   "topic": "Shear in Beams",
   "type": "mcq",
   "prompt": "Which statement best describes shear-flexure interaction in shear in steel members for shear in steel members in steel design?",
   "options": [
     "Web shear is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Shear stress is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Shear-flexure interaction is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state",
     "Web buckling is a relevant shear in steel members concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Shear-flexure interaction is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-bolted-001",
   "subject": "steel",
   "topic": "Bolted/Riveted Connections",
   "type": "mcq",
   "prompt": "Which statement best describes bolt shear in bolted connections for bolted connections in steel design?",
   "options": [
     "Bolt tension is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Bolt shear is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Bearing is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Slip resistance is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Bolt shear is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-bolted-002",
   "subject": "steel",
   "topic": "Bolted/Riveted Connections",
   "type": "mcq",
   "prompt": "Which statement best describes bolt tension in bolted connections for bolted connections in steel design?",
   "options": [
     "Bearing is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Slip resistance is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Bolt tension is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Pretension is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Bolt tension is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-bolted-003",
   "subject": "steel",
   "topic": "Bolted/Riveted Connections",
   "type": "mcq",
   "prompt": "Which statement best describes bearing in bolted connections for bolted connections in steel design?",
   "options": [
     "Slip resistance is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Pretension is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Net section is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Bearing is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Bearing is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-bolted-004",
   "subject": "steel",
   "topic": "Bolted/Riveted Connections",
   "type": "mcq",
   "prompt": "Which statement best describes slip resistance in bolted connections for bolted connections in steel design?",
   "options": [
     "Slip resistance is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Pretension is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Net section is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "It provides material around the hole to resist tear-out and related limit states"
   ],
   "correct": 0,
   "explanation": "Slip resistance is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-bolted-005",
   "subject": "steel",
   "topic": "Bolted/Riveted Connections",
   "type": "mcq",
   "prompt": "Which statement best describes pretension in bolted connections for bolted connections in steel design?",
   "options": [
     "Pretension is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Net section is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "It provides material around the hole to resist tear-out and related limit states",
     "Bolt spacing is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Pretension is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-bolted-006",
   "subject": "steel",
   "topic": "Bolted/Riveted Connections",
   "type": "mcq",
   "prompt": "Which statement best describes net section in bolted connections for bolted connections in steel design?",
   "options": [
     "Net section is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "It provides material around the hole to resist tear-out and related limit states",
     "Bolt spacing is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Eccentric bolt group is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Net section is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-bolted-007",
   "subject": "steel",
   "topic": "Bolted/Riveted Connections",
   "type": "mcq",
   "prompt": "Why is edge distance important in a bolted plate for bolted connections in steel design?",
   "options": [
     "Bolt spacing is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Eccentric bolt group is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "It provides material around the hole to resist tear-out and related limit states",
     "Direct load sharing is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Insufficient edge distance can weaken force transfer."
 },
 {
   "id": "steel-bolted-008",
   "subject": "steel",
   "topic": "Bolted/Riveted Connections",
   "type": "mcq",
   "prompt": "Which statement best describes bolt spacing in bolted connections for bolted connections in steel design?",
   "options": [
     "Eccentric bolt group is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Direct load sharing is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "A connected block failing along combined tension and shear paths",
     "Bolt spacing is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Bolt spacing is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-bolted-009",
   "subject": "steel",
   "topic": "Bolted/Riveted Connections",
   "type": "mcq",
   "prompt": "Which statement best describes eccentric bolt group in bolted connections for bolted connections in steel design?",
   "options": [
     "Eccentric bolt group is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Direct load sharing is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "A connected block failing along combined tension and shear paths",
     "Hole diameter is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Eccentric bolt group is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-bolted-010",
   "subject": "steel",
   "topic": "Bolted/Riveted Connections",
   "type": "mcq",
   "prompt": "Which statement best describes direct load sharing in bolted connections for bolted connections in steel design?",
   "options": [
     "A connected block failing along combined tension and shear paths",
     "Hole diameter is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Direct load sharing is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Connection limit states is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Direct load sharing is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-bolted-011",
   "subject": "steel",
   "topic": "Bolted/Riveted Connections",
   "type": "mcq",
   "prompt": "What does block shear describe for bolted connections in steel design?",
   "options": [
     "Hole diameter is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Connection limit states is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "A connected block failing along combined tension and shear paths",
     "Bolt group centroid is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Block shear is a connection-region limit state."
 },
 {
   "id": "steel-bolted-012",
   "subject": "steel",
   "topic": "Bolted/Riveted Connections",
   "type": "mcq",
   "prompt": "Which statement best describes hole diameter in bolted connections for bolted connections in steel design?",
   "options": [
     "Connection limit states is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Bolt group centroid is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Load distribution is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Hole diameter is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Hole diameter is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-bolted-013",
   "subject": "steel",
   "topic": "Bolted/Riveted Connections",
   "type": "mcq",
   "prompt": "Which statement best describes connection limit states in bolted connections for bolted connections in steel design?",
   "options": [
     "Bolt group centroid is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Load distribution is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Connection limit states is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Bolt shear is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Connection limit states is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-bolted-014",
   "subject": "steel",
   "topic": "Bolted/Riveted Connections",
   "type": "mcq",
   "prompt": "Which statement best describes bolt group centroid in bolted connections for bolted connections in steel design?",
   "options": [
     "Bolt group centroid is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Load distribution is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Bolt shear is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Bolt tension is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Bolt group centroid is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-bolted-015",
   "subject": "steel",
   "topic": "Bolted/Riveted Connections",
   "type": "mcq",
   "prompt": "Which statement best describes load distribution in bolted connections for bolted connections in steel design?",
   "options": [
     "Load distribution is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Bolt shear is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Bolt tension is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state",
     "Bearing is a relevant bolted connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Load distribution is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-welded-001",
   "subject": "steel",
   "topic": "Welded Connections",
   "type": "mcq",
   "prompt": "Which statement best describes effective throat in welded connections for welded connections in steel design?",
   "options": [
     "An equivalent buckling length that reflects end restraint",
     "Effective throat is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Fillet weld is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Groove weld is a relevant welded connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Effective throat is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-welded-002",
   "subject": "steel",
   "topic": "Welded Connections",
   "type": "mcq",
   "prompt": "What does effective length represent for a column for welded connections in steel design?",
   "options": [
     "Fillet weld is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "An equivalent buckling length that reflects end restraint",
     "Groove weld is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Weld group centroid is a relevant welded connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Effective length incorporates boundary conditions."
 },
 {
   "id": "steel-welded-003",
   "subject": "steel",
   "topic": "Welded Connections",
   "type": "mcq",
   "prompt": "Which statement best describes fillet weld in welded connections for welded connections in steel design?",
   "options": [
     "Fillet weld is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Groove weld is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Weld group centroid is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Eccentric weld group is a relevant welded connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Fillet weld is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-welded-004",
   "subject": "steel",
   "topic": "Welded Connections",
   "type": "mcq",
   "prompt": "Which statement best describes groove weld in welded connections for welded connections in steel design?",
   "options": [
     "Weld group centroid is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Eccentric weld group is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Groove weld is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Weld shear is a relevant welded connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Groove weld is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-welded-005",
   "subject": "steel",
   "topic": "Welded Connections",
   "type": "mcq",
   "prompt": "Which statement best describes weld group centroid in welded connections for welded connections in steel design?",
   "options": [
     "Eccentric weld group is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Weld shear is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Weld group centroid is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Weld quality is a relevant welded connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Weld group centroid is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-welded-006",
   "subject": "steel",
   "topic": "Welded Connections",
   "type": "mcq",
   "prompt": "Which statement best describes eccentric weld group in welded connections for welded connections in steel design?",
   "options": [
     "Weld shear is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Weld quality is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Incomplete fusion is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Eccentric weld group is a relevant welded connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Eccentric weld group is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-welded-007",
   "subject": "steel",
   "topic": "Welded Connections",
   "type": "mcq",
   "prompt": "Which statement best describes weld shear in welded connections for welded connections in steel design?",
   "options": [
     "Weld quality is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Incomplete fusion is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Locked-in stress remaining after fabrication or cooling",
     "Weld shear is a relevant welded connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Weld shear is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-welded-008",
   "subject": "steel",
   "topic": "Welded Connections",
   "type": "mcq",
   "prompt": "Which statement best describes weld quality in welded connections for welded connections in steel design?",
   "options": [
     "Incomplete fusion is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Locked-in stress remaining after fabrication or cooling",
     "Weld quality is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Weld inspection is a relevant welded connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Weld quality is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-welded-009",
   "subject": "steel",
   "topic": "Welded Connections",
   "type": "mcq",
   "prompt": "Which statement best describes incomplete fusion in welded connections for welded connections in steel design?",
   "options": [
     "Incomplete fusion is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Locked-in stress remaining after fabrication or cooling",
     "Weld inspection is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Intermittent weld is a relevant welded connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Incomplete fusion is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-welded-010",
   "subject": "steel",
   "topic": "Welded Connections",
   "type": "mcq",
   "prompt": "What is residual stress in a fabricated steel member for welded connections in steel design?",
   "options": [
     "Weld inspection is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Intermittent weld is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Locked-in stress remaining after fabrication or cooling",
     "Weld area is a relevant welded connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Fabrication processes can leave self-equilibrating residual stresses."
 },
 {
   "id": "steel-welded-011",
   "subject": "steel",
   "topic": "Welded Connections",
   "type": "mcq",
   "prompt": "Which statement best describes weld inspection in welded connections for welded connections in steel design?",
   "options": [
     "Intermittent weld is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Weld inspection is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Weld area is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Heat-affected zone is a relevant welded connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Weld inspection is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-welded-012",
   "subject": "steel",
   "topic": "Welded Connections",
   "type": "mcq",
   "prompt": "Which statement best describes intermittent weld in welded connections for welded connections in steel design?",
   "options": [
     "Intermittent weld is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Weld area is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Heat-affected zone is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Joint preparation is a relevant welded connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Intermittent weld is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-welded-013",
   "subject": "steel",
   "topic": "Welded Connections",
   "type": "mcq",
   "prompt": "Which statement best describes weld area in welded connections for welded connections in steel design?",
   "options": [
     "Heat-affected zone is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Weld area is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Joint preparation is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Effective throat is a relevant welded connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Weld area is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-welded-014",
   "subject": "steel",
   "topic": "Welded Connections",
   "type": "mcq",
   "prompt": "Which statement best describes heat-affected zone in welded connections for welded connections in steel design?",
   "options": [
     "Heat-affected zone is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Joint preparation is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Effective throat is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "An equivalent buckling length that reflects end restraint"
   ],
   "correct": 0,
   "explanation": "Heat-affected zone is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-welded-015",
   "subject": "steel",
   "topic": "Welded Connections",
   "type": "mcq",
   "prompt": "Which statement best describes joint preparation in welded connections for welded connections in steel design?",
   "options": [
     "Joint preparation is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "Effective throat is a relevant welded connections concept that must be evaluated in its appropriate structural limit state",
     "An equivalent buckling length that reflects end restraint",
     "Fillet weld is a relevant welded connections concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Joint preparation is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-combined-001",
   "subject": "steel",
   "topic": "Combined Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes beam-column in combined forces for combined forces in steel design?",
   "options": [
     "Eccentric axial load is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "P-delta effect is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Interaction is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Beam-column is a relevant combined forces concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Beam-column is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-combined-002",
   "subject": "steel",
   "topic": "Combined Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes eccentric axial load in combined forces for combined forces in steel design?",
   "options": [
     "P-delta effect is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Eccentric axial load is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Interaction is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "First-order moment is a relevant combined forces concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Eccentric axial load is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-combined-003",
   "subject": "steel",
   "topic": "Combined Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes P-delta effect in combined forces for combined forces in steel design?",
   "options": [
     "Interaction is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "First-order moment is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "P-delta effect is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Second-order moment is a relevant combined forces concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "P-delta effect is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-combined-004",
   "subject": "steel",
   "topic": "Combined Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes interaction in combined forces for combined forces in steel design?",
   "options": [
     "First-order moment is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Second-order moment is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Axial stress plus bending is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Interaction is a relevant combined forces concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Interaction is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-combined-005",
   "subject": "steel",
   "topic": "Combined Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes first-order moment in combined forces for combined forces in steel design?",
   "options": [
     "Second-order moment is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Axial stress plus bending is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Initial imperfection is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "First-order moment is a relevant combined forces concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "First-order moment is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-combined-006",
   "subject": "steel",
   "topic": "Combined Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes second-order moment in combined forces for combined forces in steel design?",
   "options": [
     "Axial stress plus bending is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Initial imperfection is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Moment magnification is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Second-order moment is a relevant combined forces concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Second-order moment is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-combined-007",
   "subject": "steel",
   "topic": "Combined Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes axial stress plus bending in combined forces for combined forces in steel design?",
   "options": [
     "Initial imperfection is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Moment magnification is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Biaxial bending is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Axial stress plus bending is a relevant combined forces concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Axial stress plus bending is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-combined-008",
   "subject": "steel",
   "topic": "Combined Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes initial imperfection in combined forces for combined forces in steel design?",
   "options": [
     "Moment magnification is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Initial imperfection is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Biaxial bending is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Compression-bending interaction is a relevant combined forces concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Initial imperfection is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-combined-009",
   "subject": "steel",
   "topic": "Combined Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes moment magnification in combined forces for combined forces in steel design?",
   "options": [
     "Moment magnification is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Biaxial bending is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Compression-bending interaction is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Eccentricity is a relevant combined forces concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Moment magnification is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-combined-010",
   "subject": "steel",
   "topic": "Combined Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes biaxial bending in combined forces for combined forces in steel design?",
   "options": [
     "Compression-bending interaction is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Eccentricity is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Biaxial bending is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Combined demand is a relevant combined forces concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Biaxial bending is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-combined-011",
   "subject": "steel",
   "topic": "Combined Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes compression-bending interaction in combined forces for combined forces in steel design?",
   "options": [
     "Eccentricity is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Combined demand is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Stability is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Compression-bending interaction is a relevant combined forces concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Compression-bending interaction is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-combined-012",
   "subject": "steel",
   "topic": "Combined Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes eccentricity in combined forces for combined forces in steel design?",
   "options": [
     "Combined demand is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Eccentricity is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Stability is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Force equilibrium is a relevant combined forces concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Eccentricity is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-combined-013",
   "subject": "steel",
   "topic": "Combined Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes combined demand in combined forces for combined forces in steel design?",
   "options": [
     "Stability is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Combined demand is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Force equilibrium is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Beam-column is a relevant combined forces concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Combined demand is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-combined-014",
   "subject": "steel",
   "topic": "Combined Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes stability in combined forces for combined forces in steel design?",
   "options": [
     "Force equilibrium is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Beam-column is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Stability is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Eccentric axial load is a relevant combined forces concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Stability is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-combined-015",
   "subject": "steel",
   "topic": "Combined Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes force equilibrium in combined forces for combined forces in steel design?",
   "options": [
     "Beam-column is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Eccentric axial load is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "Force equilibrium is a relevant combined forces concept that must be evaluated in its appropriate structural limit state",
     "P-delta effect is a relevant combined forces concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Force equilibrium is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-serviceability-001",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes deflection in serviceability for serviceability in steel design?",
   "options": [
     "Story drift is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Vibration is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Deflection is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Stiffness is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Deflection is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-serviceability-002",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes story drift in serviceability for serviceability in steel design?",
   "options": [
     "Story drift is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Vibration is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Stiffness is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "It controls elastic flexural stiffness and contributes to bending resistance"
   ],
   "correct": 0,
   "explanation": "Story drift is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-serviceability-003",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes vibration in serviceability for serviceability in steel design?",
   "options": [
     "Vibration is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Stiffness is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "It controls elastic flexural stiffness and contributes to bending resistance",
     "Elastic beam deflection is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Vibration is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-serviceability-004",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes stiffness in serviceability for serviceability in steel design?",
   "options": [
     "It controls elastic flexural stiffness and contributes to bending resistance",
     "Stiffness is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Elastic beam deflection is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Long-term deformation is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Stiffness is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-serviceability-005",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Why is moment of inertia important for a steel beam for serviceability in steel design?",
   "options": [
     "Elastic beam deflection is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Long-term deformation is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "It controls elastic flexural stiffness and contributes to bending resistance",
     "Creep is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Larger I generally means greater EI and lower elastic curvature."
 },
 {
   "id": "steel-serviceability-006",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes elastic beam deflection in serviceability for serviceability in steel design?",
   "options": [
     "Long-term deformation is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Creep is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Elastic beam deflection is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Service load is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Elastic beam deflection is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-serviceability-007",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes long-term deformation in serviceability for serviceability in steel design?",
   "options": [
     "Long-term deformation is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Creep is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Service load is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Drift compatibility is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Long-term deformation is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-serviceability-008",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes creep in serviceability for serviceability in steel design?",
   "options": [
     "Service load is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Creep is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Drift compatibility is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Floor vibration is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Creep is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-serviceability-009",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes service load in serviceability for serviceability in steel design?",
   "options": [
     "Service load is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Drift compatibility is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Floor vibration is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Beam camber is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Service load is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-serviceability-010",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes drift compatibility in serviceability for serviceability in steel design?",
   "options": [
     "Floor vibration is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Drift compatibility is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Beam camber is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Connection flexibility is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Drift compatibility is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-serviceability-011",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes floor vibration in serviceability for serviceability in steel design?",
   "options": [
     "Beam camber is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Connection flexibility is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Finish damage is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Floor vibration is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Floor vibration is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-serviceability-012",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes beam camber in serviceability for serviceability in steel design?",
   "options": [
     "Connection flexibility is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Beam camber is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Finish damage is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Serviceability limit is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Beam camber is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-serviceability-013",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes connection flexibility in serviceability for serviceability in steel design?",
   "options": [
     "Connection flexibility is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Finish damage is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Serviceability limit is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Crack control is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Connection flexibility is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-serviceability-014",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes finish damage in serviceability for serviceability in steel design?",
   "options": [
     "Serviceability limit is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Crack control is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Finish damage is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Immediate deflection is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Finish damage is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-serviceability-015",
   "subject": "steel",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes serviceability limit in serviceability for serviceability in steel design?",
   "options": [
     "Crack control is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Serviceability limit is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Immediate deflection is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Long-term deflection is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Serviceability limit is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-fundamentals-001",
   "subject": "reinforcedConcrete",
   "topic": "Fundamentals of Reinforced Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes tension reinforcement in fundamentals of reinforced concrete for fundamentals of reinforced concrete in reinforced-concrete design?",
   "options": [
     "Bond is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Deformations at a common interface remain compatible",
     "Tension reinforcement is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "It permits substantial inelastic deformation before fracture"
   ],
   "correct": 2,
   "explanation": "Tension reinforcement is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-fundamentals-002",
   "subject": "reinforcedConcrete",
   "topic": "Fundamentals of Reinforced Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes bond in fundamentals of reinforced concrete for fundamentals of reinforced concrete in reinforced-concrete design?",
   "options": [
     "Deformations at a common interface remain compatible",
     "It permits substantial inelastic deformation before fracture",
     "Bond is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "The line where longitudinal bending stress is zero"
   ],
   "correct": 2,
   "explanation": "Bond is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-fundamentals-003",
   "subject": "reinforcedConcrete",
   "topic": "Fundamentals of Reinforced Concrete",
   "type": "mcq",
   "prompt": "What does strain compatibility mean in a bonded composite section for fundamentals of reinforced concrete in reinforced-concrete design?",
   "options": [
     "Deformations at a common interface remain compatible",
     "It permits substantial inelastic deformation before fracture",
     "The line where longitudinal bending stress is zero",
     "Effective depth is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Compatibility links strains among materials that act together."
 },
 {
   "id": "reinforcedConcrete-fundamentals-004",
   "subject": "reinforcedConcrete",
   "topic": "Fundamentals of Reinforced Concrete",
   "type": "mcq",
   "prompt": "Why is ductility important in structural steel for fundamentals of reinforced concrete in reinforced-concrete design?",
   "options": [
     "The line where longitudinal bending stress is zero",
     "Effective depth is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "It permits substantial inelastic deformation before fracture",
     "Compression block is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Ductility can provide deformation capacity and redistribution."
 },
 {
   "id": "reinforcedConcrete-fundamentals-005",
   "subject": "reinforcedConcrete",
   "topic": "Fundamentals of Reinforced Concrete",
   "type": "mcq",
   "prompt": "What is the neutral axis in elastic beam bending for fundamentals of reinforced concrete in reinforced-concrete design?",
   "options": [
     "Effective depth is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Compression block is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Composite action is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "The line where longitudinal bending stress is zero"
   ],
   "correct": 3,
   "explanation": "Stress changes sign across the neutral axis."
 },
 {
   "id": "reinforcedConcrete-fundamentals-006",
   "subject": "reinforcedConcrete",
   "topic": "Fundamentals of Reinforced Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes effective depth in fundamentals of reinforced concrete for fundamentals of reinforced concrete in reinforced-concrete design?",
   "options": [
     "Compression block is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Effective depth is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Composite action is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Cover is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Effective depth is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-fundamentals-007",
   "subject": "reinforcedConcrete",
   "topic": "Fundamentals of Reinforced Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes compression block in fundamentals of reinforced concrete for fundamentals of reinforced concrete in reinforced-concrete design?",
   "options": [
     "Composite action is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Cover is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Cracking is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Compression block is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Compression block is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-fundamentals-008",
   "subject": "reinforcedConcrete",
   "topic": "Fundamentals of Reinforced Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes composite action in fundamentals of reinforced concrete for fundamentals of reinforced concrete in reinforced-concrete design?",
   "options": [
     "Cover is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Cracking is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Internal lever arm is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Composite action is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Composite action is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-fundamentals-009",
   "subject": "reinforcedConcrete",
   "topic": "Fundamentals of Reinforced Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes cover in fundamentals of reinforced concrete for fundamentals of reinforced concrete in reinforced-concrete design?",
   "options": [
     "Cracking is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Internal lever arm is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Cover is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Force equilibrium is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Cover is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-fundamentals-010",
   "subject": "reinforcedConcrete",
   "topic": "Fundamentals of Reinforced Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes cracking in fundamentals of reinforced concrete for fundamentals of reinforced concrete in reinforced-concrete design?",
   "options": [
     "Cracking is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Internal lever arm is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Force equilibrium is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Under-reinforcement is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Cracking is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-fundamentals-011",
   "subject": "reinforcedConcrete",
   "topic": "Fundamentals of Reinforced Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes internal lever arm in fundamentals of reinforced concrete for fundamentals of reinforced concrete in reinforced-concrete design?",
   "options": [
     "Internal lever arm is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Force equilibrium is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Under-reinforcement is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Flexure-shear distinction is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Internal lever arm is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-fundamentals-012",
   "subject": "reinforcedConcrete",
   "topic": "Fundamentals of Reinforced Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes force equilibrium in fundamentals of reinforced concrete for fundamentals of reinforced concrete in reinforced-concrete design?",
   "options": [
     "Force equilibrium is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Under-reinforcement is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Flexure-shear distinction is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "The continuous route by which loads are transferred to the ground"
   ],
   "correct": 0,
   "explanation": "Force equilibrium is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-fundamentals-013",
   "subject": "reinforcedConcrete",
   "topic": "Fundamentals of Reinforced Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes under-reinforcement in fundamentals of reinforced concrete for fundamentals of reinforced concrete in reinforced-concrete design?",
   "options": [
     "Flexure-shear distinction is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "The continuous route by which loads are transferred to the ground",
     "Tension reinforcement is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Under-reinforcement is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Under-reinforcement is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-fundamentals-014",
   "subject": "reinforcedConcrete",
   "topic": "Fundamentals of Reinforced Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes flexure-shear distinction in fundamentals of reinforced concrete for fundamentals of reinforced concrete in reinforced-concrete design?",
   "options": [
     "The continuous route by which loads are transferred to the ground",
     "Flexure-shear distinction is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Tension reinforcement is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Bond is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Flexure-shear distinction is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-fundamentals-015",
   "subject": "reinforcedConcrete",
   "topic": "Fundamentals of Reinforced Concrete",
   "type": "mcq",
   "prompt": "What is a structural load path for fundamentals of reinforced concrete in reinforced-concrete design?",
   "options": [
     "Tension reinforcement is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "The continuous route by which loads are transferred to the ground",
     "Bond is a relevant fundamentals of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Deformations at a common interface remain compatible"
   ],
   "correct": 1,
   "explanation": "A complete load path is essential for structural stability."
 },
 {
   "id": "reinforcedConcrete-materials-001",
   "subject": "reinforcedConcrete",
   "topic": "Materials & Properties",
   "type": "mcq",
   "prompt": "Which statement best describes compressive strength in materials & properties for materials & properties in reinforced-concrete design?",
   "options": [
     "Modulus of elasticity is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Compressive strength is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Reinforcing yield strength is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "It permits substantial inelastic deformation before fracture"
   ],
   "correct": 1,
   "explanation": "Compressive strength is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-materials-002",
   "subject": "reinforcedConcrete",
   "topic": "Materials & Properties",
   "type": "mcq",
   "prompt": "Which statement best describes modulus of elasticity in materials & properties for materials & properties in reinforced-concrete design?",
   "options": [
     "Reinforcing yield strength is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Modulus of elasticity is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "It permits substantial inelastic deformation before fracture",
     "Water-cement ratio is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Modulus of elasticity is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-materials-003",
   "subject": "reinforcedConcrete",
   "topic": "Materials & Properties",
   "type": "mcq",
   "prompt": "Which statement best describes reinforcing yield strength in materials & properties for materials & properties in reinforced-concrete design?",
   "options": [
     "It permits substantial inelastic deformation before fracture",
     "Water-cement ratio is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Aggregate is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Reinforcing yield strength is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Reinforcing yield strength is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-materials-004",
   "subject": "reinforcedConcrete",
   "topic": "Materials & Properties",
   "type": "mcq",
   "prompt": "Why is ductility important in structural steel for materials & properties in reinforced-concrete design?",
   "options": [
     "Water-cement ratio is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Aggregate is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "It permits substantial inelastic deformation before fracture",
     "Cement paste is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Ductility can provide deformation capacity and redistribution."
 },
 {
   "id": "reinforcedConcrete-materials-005",
   "subject": "reinforcedConcrete",
   "topic": "Materials & Properties",
   "type": "mcq",
   "prompt": "Which statement best describes water-cement ratio in materials & properties for materials & properties in reinforced-concrete design?",
   "options": [
     "Aggregate is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Cement paste is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Water-cement ratio is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Curing is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Water-cement ratio is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-materials-006",
   "subject": "reinforcedConcrete",
   "topic": "Materials & Properties",
   "type": "mcq",
   "prompt": "Which statement best describes aggregate in materials & properties for materials & properties in reinforced-concrete design?",
   "options": [
     "Cement paste is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Curing is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Creep is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Aggregate is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Aggregate is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-materials-007",
   "subject": "reinforcedConcrete",
   "topic": "Materials & Properties",
   "type": "mcq",
   "prompt": "Which statement best describes cement paste in materials & properties for materials & properties in reinforced-concrete design?",
   "options": [
     "Curing is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Creep is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Shrinkage is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Cement paste is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Cement paste is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-materials-008",
   "subject": "reinforcedConcrete",
   "topic": "Materials & Properties",
   "type": "mcq",
   "prompt": "Which statement best describes curing in materials & properties for materials & properties in reinforced-concrete design?",
   "options": [
     "Creep is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Shrinkage is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Curing is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Tensile strength is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Curing is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-materials-009",
   "subject": "reinforcedConcrete",
   "topic": "Materials & Properties",
   "type": "mcq",
   "prompt": "Which statement best describes creep in materials & properties for materials & properties in reinforced-concrete design?",
   "options": [
     "Shrinkage is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Tensile strength is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Modulus of rupture is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Creep is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Creep is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-materials-010",
   "subject": "reinforcedConcrete",
   "topic": "Materials & Properties",
   "type": "mcq",
   "prompt": "Which statement best describes shrinkage in materials & properties for materials & properties in reinforced-concrete design?",
   "options": [
     "Tensile strength is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Modulus of rupture is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Shrinkage is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Density is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Shrinkage is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-materials-011",
   "subject": "reinforcedConcrete",
   "topic": "Materials & Properties",
   "type": "mcq",
   "prompt": "Which statement best describes tensile strength in materials & properties for materials & properties in reinforced-concrete design?",
   "options": [
     "Tensile strength is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Modulus of rupture is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Density is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Durability is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Tensile strength is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-materials-012",
   "subject": "reinforcedConcrete",
   "topic": "Materials & Properties",
   "type": "mcq",
   "prompt": "Which statement best describes modulus of rupture in materials & properties for materials & properties in reinforced-concrete design?",
   "options": [
     "Density is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Durability is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Modulus of rupture is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Corrosion is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Modulus of rupture is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-materials-013",
   "subject": "reinforcedConcrete",
   "topic": "Materials & Properties",
   "type": "mcq",
   "prompt": "Which statement best describes density in materials & properties for materials & properties in reinforced-concrete design?",
   "options": [
     "Density is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Durability is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Corrosion is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Compressive strength is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Density is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-materials-014",
   "subject": "reinforcedConcrete",
   "topic": "Materials & Properties",
   "type": "mcq",
   "prompt": "Which statement best describes durability in materials & properties for materials & properties in reinforced-concrete design?",
   "options": [
     "Durability is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Corrosion is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Compressive strength is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Modulus of elasticity is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Durability is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-materials-015",
   "subject": "reinforcedConcrete",
   "topic": "Materials & Properties",
   "type": "mcq",
   "prompt": "Which statement best describes corrosion in materials & properties for materials & properties in reinforced-concrete design?",
   "options": [
     "Corrosion is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Compressive strength is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Modulus of elasticity is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state",
     "Reinforcing yield strength is a relevant materials & properties concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Corrosion is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-flexure-001",
   "subject": "reinforcedConcrete",
   "topic": "Flexure of Reinforced Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes positive moment in flexure of reinforced concrete for flexure of reinforced concrete in reinforced-concrete design?",
   "options": [
     "Negative moment is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Positive moment is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Tension zone is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Compression zone is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Positive moment is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-flexure-002",
   "subject": "reinforcedConcrete",
   "topic": "Flexure of Reinforced Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes negative moment in flexure of reinforced concrete for flexure of reinforced concrete in reinforced-concrete design?",
   "options": [
     "Negative moment is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Tension zone is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Compression zone is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Internal lever arm is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Negative moment is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-flexure-003",
   "subject": "reinforcedConcrete",
   "topic": "Flexure of Reinforced Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes tension zone in flexure of reinforced concrete for flexure of reinforced concrete in reinforced-concrete design?",
   "options": [
     "Compression zone is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Tension zone is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Internal lever arm is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Deformations at a common interface remain compatible"
   ],
   "correct": 1,
   "explanation": "Tension zone is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-flexure-004",
   "subject": "reinforcedConcrete",
   "topic": "Flexure of Reinforced Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes compression zone in flexure of reinforced concrete for flexure of reinforced concrete in reinforced-concrete design?",
   "options": [
     "Internal lever arm is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Compression zone is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Deformations at a common interface remain compatible",
     "Cracking moment is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Compression zone is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-flexure-005",
   "subject": "reinforcedConcrete",
   "topic": "Flexure of Reinforced Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes internal lever arm in flexure of reinforced concrete for flexure of reinforced concrete in reinforced-concrete design?",
   "options": [
     "Deformations at a common interface remain compatible",
     "Internal lever arm is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Cracking moment is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Compression resultant is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Internal lever arm is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-flexure-006",
   "subject": "reinforcedConcrete",
   "topic": "Flexure of Reinforced Concrete",
   "type": "mcq",
   "prompt": "What does strain compatibility mean in a bonded composite section for flexure of reinforced concrete in reinforced-concrete design?",
   "options": [
     "Cracking moment is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Compression resultant is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Tension resultant is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Deformations at a common interface remain compatible"
   ],
   "correct": 3,
   "explanation": "Compatibility links strains among materials that act together."
 },
 {
   "id": "reinforcedConcrete-flexure-007",
   "subject": "reinforcedConcrete",
   "topic": "Flexure of Reinforced Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes cracking moment in flexure of reinforced concrete for flexure of reinforced concrete in reinforced-concrete design?",
   "options": [
     "Compression resultant is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Tension resultant is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Cracking moment is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Under-reinforced behavior is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Cracking moment is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-flexure-008",
   "subject": "reinforcedConcrete",
   "topic": "Flexure of Reinforced Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes compression resultant in flexure of reinforced concrete for flexure of reinforced concrete in reinforced-concrete design?",
   "options": [
     "Tension resultant is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Compression resultant is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Under-reinforced behavior is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Over-reinforced behavior is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Compression resultant is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-flexure-009",
   "subject": "reinforcedConcrete",
   "topic": "Flexure of Reinforced Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes tension resultant in flexure of reinforced concrete for flexure of reinforced concrete in reinforced-concrete design?",
   "options": [
     "Tension resultant is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Under-reinforced behavior is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Over-reinforced behavior is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "The line where longitudinal bending stress is zero"
   ],
   "correct": 0,
   "explanation": "Tension resultant is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-flexure-010",
   "subject": "reinforcedConcrete",
   "topic": "Flexure of Reinforced Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes under-reinforced behavior in flexure of reinforced concrete for flexure of reinforced concrete in reinforced-concrete design?",
   "options": [
     "Over-reinforced behavior is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "The line where longitudinal bending stress is zero",
     "Flexural equilibrium is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Under-reinforced behavior is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Under-reinforced behavior is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-flexure-011",
   "subject": "reinforcedConcrete",
   "topic": "Flexure of Reinforced Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes over-reinforced behavior in flexure of reinforced concrete for flexure of reinforced concrete in reinforced-concrete design?",
   "options": [
     "The line where longitudinal bending stress is zero",
     "Over-reinforced behavior is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Flexural equilibrium is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Effective depth is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Over-reinforced behavior is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-flexure-012",
   "subject": "reinforcedConcrete",
   "topic": "Flexure of Reinforced Concrete",
   "type": "mcq",
   "prompt": "What is the neutral axis in elastic beam bending for flexure of reinforced concrete in reinforced-concrete design?",
   "options": [
     "The line where longitudinal bending stress is zero",
     "Flexural equilibrium is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Effective depth is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Moment resistance is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Stress changes sign across the neutral axis."
 },
 {
   "id": "reinforcedConcrete-flexure-013",
   "subject": "reinforcedConcrete",
   "topic": "Flexure of Reinforced Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes flexural equilibrium in flexure of reinforced concrete for flexure of reinforced concrete in reinforced-concrete design?",
   "options": [
     "Effective depth is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Moment resistance is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Positive moment is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Flexural equilibrium is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Flexural equilibrium is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-flexure-014",
   "subject": "reinforcedConcrete",
   "topic": "Flexure of Reinforced Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes effective depth in flexure of reinforced concrete for flexure of reinforced concrete in reinforced-concrete design?",
   "options": [
     "Moment resistance is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Positive moment is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Effective depth is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Negative moment is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Effective depth is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-flexure-015",
   "subject": "reinforcedConcrete",
   "topic": "Flexure of Reinforced Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes moment resistance in flexure of reinforced concrete for flexure of reinforced concrete in reinforced-concrete design?",
   "options": [
     "Moment resistance is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Positive moment is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Negative moment is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state",
     "Tension zone is a relevant flexure of reinforced concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Moment resistance is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-singly-001",
   "subject": "reinforcedConcrete",
   "topic": "Singly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes tension steel in singly reinforced beams for singly reinforced beams in reinforced-concrete design?",
   "options": [
     "Effective depth is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Tension steel is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Steel ratio is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Compression block is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Tension steel is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-singly-002",
   "subject": "reinforcedConcrete",
   "topic": "Singly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes effective depth in singly reinforced beams for singly reinforced beams in reinforced-concrete design?",
   "options": [
     "Steel ratio is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Compression block is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Effective depth is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Internal lever arm is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Effective depth is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-singly-003",
   "subject": "reinforcedConcrete",
   "topic": "Singly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes steel ratio in singly reinforced beams for singly reinforced beams in reinforced-concrete design?",
   "options": [
     "Compression block is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Internal lever arm is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Under-reinforced section is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Steel ratio is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Steel ratio is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-singly-004",
   "subject": "reinforcedConcrete",
   "topic": "Singly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes compression block in singly reinforced beams for singly reinforced beams in reinforced-concrete design?",
   "options": [
     "Internal lever arm is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Compression block is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Under-reinforced section is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Minimum reinforcement is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Compression block is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-singly-005",
   "subject": "reinforcedConcrete",
   "topic": "Singly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes internal lever arm in singly reinforced beams for singly reinforced beams in reinforced-concrete design?",
   "options": [
     "Under-reinforced section is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Minimum reinforcement is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Bar placement is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Internal lever arm is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Internal lever arm is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-singly-006",
   "subject": "reinforcedConcrete",
   "topic": "Singly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes under-reinforced section in singly reinforced beams for singly reinforced beams in reinforced-concrete design?",
   "options": [
     "Under-reinforced section is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Minimum reinforcement is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Bar placement is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Gross depth is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Under-reinforced section is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-singly-007",
   "subject": "reinforcedConcrete",
   "topic": "Singly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes minimum reinforcement in singly reinforced beams for singly reinforced beams in reinforced-concrete design?",
   "options": [
     "Bar placement is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Gross depth is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Minimum reinforcement is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Clear cover is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Minimum reinforcement is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-singly-008",
   "subject": "reinforcedConcrete",
   "topic": "Singly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes bar placement in singly reinforced beams for singly reinforced beams in reinforced-concrete design?",
   "options": [
     "Gross depth is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Clear cover is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Bar placement is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Flexural equilibrium is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Bar placement is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-singly-009",
   "subject": "reinforcedConcrete",
   "topic": "Singly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes gross depth in singly reinforced beams for singly reinforced beams in reinforced-concrete design?",
   "options": [
     "Clear cover is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Flexural equilibrium is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Gross depth is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Tension force is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Gross depth is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-singly-010",
   "subject": "reinforcedConcrete",
   "topic": "Singly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes clear cover in singly reinforced beams for singly reinforced beams in reinforced-concrete design?",
   "options": [
     "Flexural equilibrium is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Clear cover is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Tension force is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Compression force is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Clear cover is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-singly-011",
   "subject": "reinforcedConcrete",
   "topic": "Singly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes flexural equilibrium in singly reinforced beams for singly reinforced beams in reinforced-concrete design?",
   "options": [
     "Tension force is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Compression force is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Flexural equilibrium is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Bar area is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Flexural equilibrium is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-singly-012",
   "subject": "reinforcedConcrete",
   "topic": "Singly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes tension force in singly reinforced beams for singly reinforced beams in reinforced-concrete design?",
   "options": [
     "Compression force is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Tension force is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Bar area is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Reinforcement congestion is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Tension force is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-singly-013",
   "subject": "reinforcedConcrete",
   "topic": "Singly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes compression force in singly reinforced beams for singly reinforced beams in reinforced-concrete design?",
   "options": [
     "Bar area is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Reinforcement congestion is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Tension steel is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Compression force is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Compression force is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-singly-014",
   "subject": "reinforcedConcrete",
   "topic": "Singly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes bar area in singly reinforced beams for singly reinforced beams in reinforced-concrete design?",
   "options": [
     "Reinforcement congestion is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Bar area is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Tension steel is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Effective depth is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Bar area is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-singly-015",
   "subject": "reinforcedConcrete",
   "topic": "Singly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes reinforcement congestion in singly reinforced beams for singly reinforced beams in reinforced-concrete design?",
   "options": [
     "Tension steel is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Reinforcement congestion is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Effective depth is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Steel ratio is a relevant singly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Reinforcement congestion is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-doubly-001",
   "subject": "reinforcedConcrete",
   "topic": "Doubly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes compression steel in doubly reinforced beams for doubly reinforced beams in reinforced-concrete design?",
   "options": [
     "Tension steel is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Strain in compression steel is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Additional moment is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Compression steel is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Compression steel is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-doubly-002",
   "subject": "reinforcedConcrete",
   "topic": "Doubly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes tension steel in doubly reinforced beams for doubly reinforced beams in reinforced-concrete design?",
   "options": [
     "Strain in compression steel is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Tension steel is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Additional moment is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Section depth limit is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Tension steel is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-doubly-003",
   "subject": "reinforcedConcrete",
   "topic": "Doubly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes strain in compression steel in doubly reinforced beams for doubly reinforced beams in reinforced-concrete design?",
   "options": [
     "Additional moment is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Strain in compression steel is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Section depth limit is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "It permits substantial inelastic deformation before fracture"
   ],
   "correct": 1,
   "explanation": "Strain in compression steel is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-doubly-004",
   "subject": "reinforcedConcrete",
   "topic": "Doubly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes additional moment in doubly reinforced beams for doubly reinforced beams in reinforced-concrete design?",
   "options": [
     "Section depth limit is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "It permits substantial inelastic deformation before fracture",
     "Force equilibrium is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Additional moment is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Additional moment is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-doubly-005",
   "subject": "reinforcedConcrete",
   "topic": "Doubly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes section depth limit in doubly reinforced beams for doubly reinforced beams in reinforced-concrete design?",
   "options": [
     "Section depth limit is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "It permits substantial inelastic deformation before fracture",
     "Force equilibrium is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Compression resultant is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Section depth limit is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-doubly-006",
   "subject": "reinforcedConcrete",
   "topic": "Doubly Reinforced Beams",
   "type": "mcq",
   "prompt": "Why is ductility important in structural steel for doubly reinforced beams in reinforced-concrete design?",
   "options": [
     "Force equilibrium is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Compression resultant is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Bar detailing is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "It permits substantial inelastic deformation before fracture"
   ],
   "correct": 3,
   "explanation": "Ductility can provide deformation capacity and redistribution."
 },
 {
   "id": "reinforcedConcrete-doubly-007",
   "subject": "reinforcedConcrete",
   "topic": "Doubly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes force equilibrium in doubly reinforced beams for doubly reinforced beams in reinforced-concrete design?",
   "options": [
     "Force equilibrium is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Compression resultant is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Bar detailing is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Long-term behavior is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Force equilibrium is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-doubly-008",
   "subject": "reinforcedConcrete",
   "topic": "Doubly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes compression resultant in doubly reinforced beams for doubly reinforced beams in reinforced-concrete design?",
   "options": [
     "Bar detailing is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Long-term behavior is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Compression resultant is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Congestion is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Compression resultant is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-doubly-009",
   "subject": "reinforcedConcrete",
   "topic": "Doubly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes bar detailing in doubly reinforced beams for doubly reinforced beams in reinforced-concrete design?",
   "options": [
     "Long-term behavior is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Congestion is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Compression reinforcement restraint is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Bar detailing is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Bar detailing is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-doubly-010",
   "subject": "reinforcedConcrete",
   "topic": "Doubly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes long-term behavior in doubly reinforced beams for doubly reinforced beams in reinforced-concrete design?",
   "options": [
     "Congestion is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Compression reinforcement restraint is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Lever arm is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Long-term behavior is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Long-term behavior is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-doubly-011",
   "subject": "reinforcedConcrete",
   "topic": "Doubly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes congestion in doubly reinforced beams for doubly reinforced beams in reinforced-concrete design?",
   "options": [
     "Congestion is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Compression reinforcement restraint is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Lever arm is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Yield strain is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Congestion is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-doubly-012",
   "subject": "reinforcedConcrete",
   "topic": "Doubly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes compression reinforcement restraint in doubly reinforced beams for doubly reinforced beams in reinforced-concrete design?",
   "options": [
     "Lever arm is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Yield strain is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Combined steel-concrete compression is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Compression reinforcement restraint is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Compression reinforcement restraint is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-doubly-013",
   "subject": "reinforcedConcrete",
   "topic": "Doubly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes lever arm in doubly reinforced beams for doubly reinforced beams in reinforced-concrete design?",
   "options": [
     "Yield strain is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Combined steel-concrete compression is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Lever arm is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Compression steel is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Lever arm is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-doubly-014",
   "subject": "reinforcedConcrete",
   "topic": "Doubly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes yield strain in doubly reinforced beams for doubly reinforced beams in reinforced-concrete design?",
   "options": [
     "Yield strain is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Combined steel-concrete compression is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Compression steel is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Tension steel is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Yield strain is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-doubly-015",
   "subject": "reinforcedConcrete",
   "topic": "Doubly Reinforced Beams",
   "type": "mcq",
   "prompt": "Which statement best describes combined steel-concrete compression in doubly reinforced beams for doubly reinforced beams in reinforced-concrete design?",
   "options": [
     "Compression steel is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Combined steel-concrete compression is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Tension steel is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state",
     "Strain in compression steel is a relevant doubly reinforced beams concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Combined steel-concrete compression is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-shear-001",
   "subject": "reinforcedConcrete",
   "topic": "Shear",
   "type": "mcq",
   "prompt": "Which statement best describes diagonal cracking in shear for shear in reinforced-concrete design?",
   "options": [
     "Stirrups is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Shear stress is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "One-way shear is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Diagonal cracking is a relevant shear concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Diagonal cracking is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-shear-002",
   "subject": "reinforcedConcrete",
   "topic": "Shear",
   "type": "mcq",
   "prompt": "Which statement best describes stirrups in shear for shear in reinforced-concrete design?",
   "options": [
     "Shear stress is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "One-way shear is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Diagonal compression is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Stirrups is a relevant shear concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Stirrups is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-shear-003",
   "subject": "reinforcedConcrete",
   "topic": "Shear",
   "type": "mcq",
   "prompt": "Which statement best describes shear stress in shear for shear in reinforced-concrete design?",
   "options": [
     "One-way shear is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Shear stress is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Diagonal compression is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Shear-compression failure is a relevant shear concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Shear stress is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-shear-004",
   "subject": "reinforcedConcrete",
   "topic": "Shear",
   "type": "mcq",
   "prompt": "Which statement best describes one-way shear in shear for shear in reinforced-concrete design?",
   "options": [
     "Diagonal compression is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "One-way shear is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Shear-compression failure is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Stirrup spacing is a relevant shear concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "One-way shear is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-shear-005",
   "subject": "reinforcedConcrete",
   "topic": "Shear",
   "type": "mcq",
   "prompt": "Which statement best describes diagonal compression in shear for shear in reinforced-concrete design?",
   "options": [
     "Diagonal compression is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Shear-compression failure is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Stirrup spacing is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Minimum shear reinforcement is a relevant shear concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Diagonal compression is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-shear-006",
   "subject": "reinforcedConcrete",
   "topic": "Shear",
   "type": "mcq",
   "prompt": "Which statement best describes shear-compression failure in shear for shear in reinforced-concrete design?",
   "options": [
     "Shear-compression failure is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Stirrup spacing is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Minimum shear reinforcement is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Support shear is a relevant shear concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Shear-compression failure is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-shear-007",
   "subject": "reinforcedConcrete",
   "topic": "Shear",
   "type": "mcq",
   "prompt": "Which statement best describes stirrup spacing in shear for shear in reinforced-concrete design?",
   "options": [
     "Minimum shear reinforcement is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Support shear is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Web depth is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Stirrup spacing is a relevant shear concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Stirrup spacing is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-shear-008",
   "subject": "reinforcedConcrete",
   "topic": "Shear",
   "type": "mcq",
   "prompt": "Which statement best describes minimum shear reinforcement in shear for shear in reinforced-concrete design?",
   "options": [
     "Support shear is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Minimum shear reinforcement is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Web depth is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Shear demand is a relevant shear concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Minimum shear reinforcement is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-shear-009",
   "subject": "reinforcedConcrete",
   "topic": "Shear",
   "type": "mcq",
   "prompt": "Which statement best describes support shear in shear for shear in reinforced-concrete design?",
   "options": [
     "Web depth is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Shear demand is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Shear diagram is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Support shear is a relevant shear concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Support shear is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-shear-010",
   "subject": "reinforcedConcrete",
   "topic": "Shear",
   "type": "mcq",
   "prompt": "Which statement best describes web depth in shear for shear in reinforced-concrete design?",
   "options": [
     "Shear demand is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Shear diagram is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Crack control is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Web depth is a relevant shear concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Web depth is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-shear-011",
   "subject": "reinforcedConcrete",
   "topic": "Shear",
   "type": "mcq",
   "prompt": "Which statement best describes shear demand in shear for shear in reinforced-concrete design?",
   "options": [
     "Shear diagram is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Crack control is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Shear reinforcement anchorage is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Shear demand is a relevant shear concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Shear demand is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-shear-012",
   "subject": "reinforcedConcrete",
   "topic": "Shear",
   "type": "mcq",
   "prompt": "Which statement best describes shear diagram in shear for shear in reinforced-concrete design?",
   "options": [
     "Shear diagram is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Crack control is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Shear reinforcement anchorage is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Shear-flexure interaction is a relevant shear concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Shear diagram is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-shear-013",
   "subject": "reinforcedConcrete",
   "topic": "Shear",
   "type": "mcq",
   "prompt": "Which statement best describes crack control in shear for shear in reinforced-concrete design?",
   "options": [
     "Shear reinforcement anchorage is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Crack control is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Shear-flexure interaction is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Diagonal cracking is a relevant shear concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Crack control is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-shear-014",
   "subject": "reinforcedConcrete",
   "topic": "Shear",
   "type": "mcq",
   "prompt": "Which statement best describes shear reinforcement anchorage in shear for shear in reinforced-concrete design?",
   "options": [
     "Shear reinforcement anchorage is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Shear-flexure interaction is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Diagonal cracking is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Stirrups is a relevant shear concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Shear reinforcement anchorage is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-shear-015",
   "subject": "reinforcedConcrete",
   "topic": "Shear",
   "type": "mcq",
   "prompt": "Which statement best describes shear-flexure interaction in shear for shear in reinforced-concrete design?",
   "options": [
     "Diagonal cracking is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Shear-flexure interaction is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Stirrups is a relevant shear concept that must be evaluated in its appropriate structural limit state",
     "Shear stress is a relevant shear concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Shear-flexure interaction is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-development-001",
   "subject": "reinforcedConcrete",
   "topic": "Development & Anchorage",
   "type": "mcq",
   "prompt": "Which statement best describes development length in development & anchorage for development & anchorage in reinforced-concrete design?",
   "options": [
     "Bond stress is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Development length is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Bar diameter is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Concrete cover is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Development length is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-development-002",
   "subject": "reinforcedConcrete",
   "topic": "Development & Anchorage",
   "type": "mcq",
   "prompt": "Which statement best describes bond stress in development & anchorage for development & anchorage in reinforced-concrete design?",
   "options": [
     "Bar diameter is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Bond stress is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Concrete cover is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Standard hook is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Bond stress is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-development-003",
   "subject": "reinforcedConcrete",
   "topic": "Development & Anchorage",
   "type": "mcq",
   "prompt": "Which statement best describes bar diameter in development & anchorage for development & anchorage in reinforced-concrete design?",
   "options": [
     "Bar diameter is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Concrete cover is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Standard hook is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Lap splice is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Bar diameter is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-development-004",
   "subject": "reinforcedConcrete",
   "topic": "Development & Anchorage",
   "type": "mcq",
   "prompt": "Which statement best describes concrete cover in development & anchorage for development & anchorage in reinforced-concrete design?",
   "options": [
     "Standard hook is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Concrete cover is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Lap splice is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Bar cutoff is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Concrete cover is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-development-005",
   "subject": "reinforcedConcrete",
   "topic": "Development & Anchorage",
   "type": "mcq",
   "prompt": "Which statement best describes standard hook in development & anchorage for development & anchorage in reinforced-concrete design?",
   "options": [
     "Lap splice is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Standard hook is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Bar cutoff is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Anchorage is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Standard hook is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-development-006",
   "subject": "reinforcedConcrete",
   "topic": "Development & Anchorage",
   "type": "mcq",
   "prompt": "Which statement best describes lap splice in development & anchorage for development & anchorage in reinforced-concrete design?",
   "options": [
     "Bar cutoff is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Anchorage is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Splice congestion is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Lap splice is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Lap splice is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-development-007",
   "subject": "reinforcedConcrete",
   "topic": "Development & Anchorage",
   "type": "mcq",
   "prompt": "Which statement best describes bar cutoff in development & anchorage for development & anchorage in reinforced-concrete design?",
   "options": [
     "Anchorage is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Splice congestion is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Splitting is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Bar cutoff is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Bar cutoff is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-development-008",
   "subject": "reinforcedConcrete",
   "topic": "Development & Anchorage",
   "type": "mcq",
   "prompt": "Which statement best describes anchorage in development & anchorage for development & anchorage in reinforced-concrete design?",
   "options": [
     "Splice congestion is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Splitting is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Anchorage is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Transverse confinement is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Anchorage is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-development-009",
   "subject": "reinforcedConcrete",
   "topic": "Development & Anchorage",
   "type": "mcq",
   "prompt": "Which statement best describes splice congestion in development & anchorage for development & anchorage in reinforced-concrete design?",
   "options": [
     "Splice congestion is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Splitting is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Transverse confinement is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Mechanical anchorage is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Splice congestion is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-development-010",
   "subject": "reinforcedConcrete",
   "topic": "Development & Anchorage",
   "type": "mcq",
   "prompt": "Which statement best describes splitting in development & anchorage for development & anchorage in reinforced-concrete design?",
   "options": [
     "Transverse confinement is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Splitting is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Mechanical anchorage is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "The connection must transmit the member force without exceeding any applicable limit state"
   ],
   "correct": 1,
   "explanation": "Splitting is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-development-011",
   "subject": "reinforcedConcrete",
   "topic": "Development & Anchorage",
   "type": "mcq",
   "prompt": "Which statement best describes transverse confinement in development & anchorage for development & anchorage in reinforced-concrete design?",
   "options": [
     "Mechanical anchorage is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "The connection must transmit the member force without exceeding any applicable limit state",
     "Transverse confinement is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Support anchorage is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Transverse confinement is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-development-012",
   "subject": "reinforcedConcrete",
   "topic": "Development & Anchorage",
   "type": "mcq",
   "prompt": "Which statement best describes mechanical anchorage in development & anchorage for development & anchorage in reinforced-concrete design?",
   "options": [
     "Mechanical anchorage is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "The connection must transmit the member force without exceeding any applicable limit state",
     "Support anchorage is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Development beyond critical section is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Mechanical anchorage is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-development-013",
   "subject": "reinforcedConcrete",
   "topic": "Development & Anchorage",
   "type": "mcq",
   "prompt": "Why is force transfer important at a steel connection for development & anchorage in reinforced-concrete design?",
   "options": [
     "Support anchorage is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "The connection must transmit the member force without exceeding any applicable limit state",
     "Development beyond critical section is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Development length is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "A continuous force path is required."
 },
 {
   "id": "reinforcedConcrete-development-014",
   "subject": "reinforcedConcrete",
   "topic": "Development & Anchorage",
   "type": "mcq",
   "prompt": "Which statement best describes support anchorage in development & anchorage for development & anchorage in reinforced-concrete design?",
   "options": [
     "Support anchorage is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Development beyond critical section is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Development length is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Bond stress is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Support anchorage is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-development-015",
   "subject": "reinforcedConcrete",
   "topic": "Development & Anchorage",
   "type": "mcq",
   "prompt": "Which statement best describes development beyond critical section in development & anchorage for development & anchorage in reinforced-concrete design?",
   "options": [
     "Development length is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Bond stress is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Development beyond critical section is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state",
     "Bar diameter is a relevant development & anchorage concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Development beyond critical section is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-columns-001",
   "subject": "reinforcedConcrete",
   "topic": "Columns",
   "type": "mcq",
   "prompt": "Which statement best describes longitudinal reinforcement in columns for columns in reinforced-concrete design?",
   "options": [
     "Ties is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Spiral reinforcement is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Longitudinal reinforcement is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Axial load is a relevant columns concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Longitudinal reinforcement is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-columns-002",
   "subject": "reinforcedConcrete",
   "topic": "Columns",
   "type": "mcq",
   "prompt": "Which statement best describes ties in columns for columns in reinforced-concrete design?",
   "options": [
     "Spiral reinforcement is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Axial load is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Eccentricity is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Ties is a relevant columns concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Ties is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-columns-003",
   "subject": "reinforcedConcrete",
   "topic": "Columns",
   "type": "mcq",
   "prompt": "Which statement best describes spiral reinforcement in columns for columns in reinforced-concrete design?",
   "options": [
     "Axial load is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Spiral reinforcement is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Eccentricity is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "P-m interaction is a relevant columns concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Spiral reinforcement is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-columns-004",
   "subject": "reinforcedConcrete",
   "topic": "Columns",
   "type": "mcq",
   "prompt": "Which statement best describes axial load in columns for columns in reinforced-concrete design?",
   "options": [
     "Axial load is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Eccentricity is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "P-m interaction is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Confinement is a relevant columns concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Axial load is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-columns-005",
   "subject": "reinforcedConcrete",
   "topic": "Columns",
   "type": "mcq",
   "prompt": "Which statement best describes eccentricity in columns for columns in reinforced-concrete design?",
   "options": [
     "P-m interaction is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Eccentricity is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Confinement is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Bar restraint is a relevant columns concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Eccentricity is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-columns-006",
   "subject": "reinforcedConcrete",
   "topic": "Columns",
   "type": "mcq",
   "prompt": "Which statement best describes P-M interaction in columns for columns in reinforced-concrete design?",
   "options": [
     "P-m interaction is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Confinement is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Bar restraint is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Column area is a relevant columns concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "P-m interaction is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-columns-007",
   "subject": "reinforcedConcrete",
   "topic": "Columns",
   "type": "mcq",
   "prompt": "Which statement best describes confinement in columns for columns in reinforced-concrete design?",
   "options": [
     "Bar restraint is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Column area is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Column splice is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Confinement is a relevant columns concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Confinement is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-columns-008",
   "subject": "reinforcedConcrete",
   "topic": "Columns",
   "type": "mcq",
   "prompt": "Which statement best describes bar restraint in columns for columns in reinforced-concrete design?",
   "options": [
     "Column area is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Column splice is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Biaxial bending is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Bar restraint is a relevant columns concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Bar restraint is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-columns-009",
   "subject": "reinforcedConcrete",
   "topic": "Columns",
   "type": "mcq",
   "prompt": "Which statement best describes column area in columns for columns in reinforced-concrete design?",
   "options": [
     "Column splice is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Column area is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Biaxial bending is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Cover is a relevant columns concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Column area is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-columns-010",
   "subject": "reinforcedConcrete",
   "topic": "Columns",
   "type": "mcq",
   "prompt": "Which statement best describes column splice in columns for columns in reinforced-concrete design?",
   "options": [
     "Column splice is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Biaxial bending is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Cover is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "The continuous route by which loads are transferred to the ground"
   ],
   "correct": 0,
   "explanation": "Column splice is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-columns-011",
   "subject": "reinforcedConcrete",
   "topic": "Columns",
   "type": "mcq",
   "prompt": "Which statement best describes biaxial bending in columns for columns in reinforced-concrete design?",
   "options": [
     "Biaxial bending is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Cover is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "The continuous route by which loads are transferred to the ground",
     "Axial stress is a relevant columns concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Biaxial bending is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-columns-012",
   "subject": "reinforcedConcrete",
   "topic": "Columns",
   "type": "mcq",
   "prompt": "Which statement best describes cover in columns for columns in reinforced-concrete design?",
   "options": [
     "Cover is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "The continuous route by which loads are transferred to the ground",
     "Axial stress is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Section symmetry is a relevant columns concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Cover is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-columns-013",
   "subject": "reinforcedConcrete",
   "topic": "Columns",
   "type": "mcq",
   "prompt": "What is a structural load path for columns in reinforced-concrete design?",
   "options": [
     "The continuous route by which loads are transferred to the ground",
     "Axial stress is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Section symmetry is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Longitudinal reinforcement is a relevant columns concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "A complete load path is essential for structural stability."
 },
 {
   "id": "reinforcedConcrete-columns-014",
   "subject": "reinforcedConcrete",
   "topic": "Columns",
   "type": "mcq",
   "prompt": "Which statement best describes axial stress in columns for columns in reinforced-concrete design?",
   "options": [
     "Section symmetry is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Longitudinal reinforcement is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Ties is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Axial stress is a relevant columns concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Axial stress is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-columns-015",
   "subject": "reinforcedConcrete",
   "topic": "Columns",
   "type": "mcq",
   "prompt": "Which statement best describes section symmetry in columns for columns in reinforced-concrete design?",
   "options": [
     "Longitudinal reinforcement is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Ties is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Spiral reinforcement is a relevant columns concept that must be evaluated in its appropriate structural limit state",
     "Section symmetry is a relevant columns concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Section symmetry is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-slender-001",
   "subject": "reinforcedConcrete",
   "topic": "Slender Columns",
   "type": "mcq",
   "prompt": "Why is column slenderness important for slender columns in reinforced-concrete design?",
   "options": [
     "Greater slenderness generally increases susceptibility to buckling",
     "An equivalent buckling length that reflects end restraint",
     "Second-order moment is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "P-delta is a relevant slender columns concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Stability becomes more critical as KL/r increases."
 },
 {
   "id": "reinforcedConcrete-slender-002",
   "subject": "reinforcedConcrete",
   "topic": "Slender Columns",
   "type": "mcq",
   "prompt": "What does effective length represent for a column for slender columns in reinforced-concrete design?",
   "options": [
     "Second-order moment is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "P-delta is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "Moment magnification is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "An equivalent buckling length that reflects end restraint"
   ],
   "correct": 3,
   "explanation": "Effective length incorporates boundary conditions."
 },
 {
   "id": "reinforcedConcrete-slender-003",
   "subject": "reinforcedConcrete",
   "topic": "Slender Columns",
   "type": "mcq",
   "prompt": "Which statement best describes second-order moment in slender columns for slender columns in reinforced-concrete design?",
   "options": [
     "P-delta is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "Moment magnification is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "Cracked stiffness is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "Second-order moment is a relevant slender columns concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Second-order moment is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-slender-004",
   "subject": "reinforcedConcrete",
   "topic": "Slender Columns",
   "type": "mcq",
   "prompt": "Which statement best describes P-delta in slender columns for slender columns in reinforced-concrete design?",
   "options": [
     "Moment magnification is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "Cracked stiffness is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "P-delta is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "It restrains lateral movement and can reduce effective length"
   ],
   "correct": 2,
   "explanation": "P-delta is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-slender-005",
   "subject": "reinforcedConcrete",
   "topic": "Slender Columns",
   "type": "mcq",
   "prompt": "Which statement best describes moment magnification in slender columns for slender columns in reinforced-concrete design?",
   "options": [
     "Cracked stiffness is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "It restrains lateral movement and can reduce effective length",
     "Moment magnification is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "Initial eccentricity is a relevant slender columns concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Moment magnification is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-slender-006",
   "subject": "reinforcedConcrete",
   "topic": "Slender Columns",
   "type": "mcq",
   "prompt": "Which statement best describes cracked stiffness in slender columns for slender columns in reinforced-concrete design?",
   "options": [
     "It restrains lateral movement and can reduce effective length",
     "Initial eccentricity is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "Cracked stiffness is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "Stability is a relevant slender columns concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Cracked stiffness is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-slender-007",
   "subject": "reinforcedConcrete",
   "topic": "Slender Columns",
   "type": "mcq",
   "prompt": "How can bracing improve column stability for slender columns in reinforced-concrete design?",
   "options": [
     "Initial eccentricity is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "Stability is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "It restrains lateral movement and can reduce effective length",
     "It has lower radius of gyration or inertia"
   ],
   "correct": 2,
   "explanation": "Bracing improves stability by limiting buckling deformation."
 },
 {
   "id": "reinforcedConcrete-slender-008",
   "subject": "reinforcedConcrete",
   "topic": "Slender Columns",
   "type": "mcq",
   "prompt": "Which statement best describes initial eccentricity in slender columns for slender columns in reinforced-concrete design?",
   "options": [
     "Initial eccentricity is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "Stability is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "It has lower radius of gyration or inertia",
     "First-order moment is a relevant slender columns concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Initial eccentricity is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-slender-009",
   "subject": "reinforcedConcrete",
   "topic": "Slender Columns",
   "type": "mcq",
   "prompt": "Which statement best describes stability in slender columns for slender columns in reinforced-concrete design?",
   "options": [
     "Stability is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "It has lower radius of gyration or inertia",
     "First-order moment is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "Magnified moment is a relevant slender columns concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Stability is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-slender-010",
   "subject": "reinforcedConcrete",
   "topic": "Slender Columns",
   "type": "mcq",
   "prompt": "Why can the weak axis govern column buckling for slender columns in reinforced-concrete design?",
   "options": [
     "First-order moment is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "It has lower radius of gyration or inertia",
     "Magnified moment is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "The influence of end restraint on buckling length"
   ],
   "correct": 1,
   "explanation": "Lower stiffness produces lower buckling resistance."
 },
 {
   "id": "reinforcedConcrete-slender-011",
   "subject": "reinforcedConcrete",
   "topic": "Slender Columns",
   "type": "mcq",
   "prompt": "Which statement best describes first-order moment in slender columns for slender columns in reinforced-concrete design?",
   "options": [
     "Magnified moment is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "First-order moment is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "The influence of end restraint on buckling length",
     "Lateral displacement is a relevant slender columns concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "First-order moment is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-slender-012",
   "subject": "reinforcedConcrete",
   "topic": "Slender Columns",
   "type": "mcq",
   "prompt": "Which statement best describes magnified moment in slender columns for slender columns in reinforced-concrete design?",
   "options": [
     "The influence of end restraint on buckling length",
     "Magnified moment is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "Lateral displacement is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "Stability interaction is a relevant slender columns concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Magnified moment is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-slender-013",
   "subject": "reinforcedConcrete",
   "topic": "Slender Columns",
   "type": "mcq",
   "prompt": "What does the effective length factor K account for for slender columns in reinforced-concrete design?",
   "options": [
     "Lateral displacement is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "Stability interaction is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "Greater slenderness generally increases susceptibility to buckling",
     "The influence of end restraint on buckling length"
   ],
   "correct": 3,
   "explanation": "Le = KL."
 },
 {
   "id": "reinforcedConcrete-slender-014",
   "subject": "reinforcedConcrete",
   "topic": "Slender Columns",
   "type": "mcq",
   "prompt": "Which statement best describes lateral displacement in slender columns for slender columns in reinforced-concrete design?",
   "options": [
     "Stability interaction is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "Greater slenderness generally increases susceptibility to buckling",
     "Lateral displacement is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "An equivalent buckling length that reflects end restraint"
   ],
   "correct": 2,
   "explanation": "Lateral displacement is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-slender-015",
   "subject": "reinforcedConcrete",
   "topic": "Slender Columns",
   "type": "mcq",
   "prompt": "Which statement best describes stability interaction in slender columns for slender columns in reinforced-concrete design?",
   "options": [
     "Greater slenderness generally increases susceptibility to buckling",
     "Stability interaction is a relevant slender columns concept that must be evaluated in its appropriate structural limit state",
     "An equivalent buckling length that reflects end restraint",
     "Second-order moment is a relevant slender columns concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Stability interaction is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-oneway-001",
   "subject": "reinforcedConcrete",
   "topic": "One-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes one-way action in one-way slabs for one-way slabs in reinforced-concrete design?",
   "options": [
     "Main bars is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Distribution bars is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "One-meter strip is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "One-way action is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "One-way action is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-oneway-002",
   "subject": "reinforcedConcrete",
   "topic": "One-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes main bars in one-way slabs for one-way slabs in reinforced-concrete design?",
   "options": [
     "Distribution bars is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "One-meter strip is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Main bars is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Positive moment is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Main bars is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-oneway-003",
   "subject": "reinforcedConcrete",
   "topic": "One-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes distribution bars in one-way slabs for one-way slabs in reinforced-concrete design?",
   "options": [
     "One-meter strip is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Positive moment is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Distribution bars is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Negative moment is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Distribution bars is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-oneway-004",
   "subject": "reinforcedConcrete",
   "topic": "One-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes one-meter strip in one-way slabs for one-way slabs in reinforced-concrete design?",
   "options": [
     "Positive moment is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Negative moment is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Slab thickness is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "One-meter strip is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "One-meter strip is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-oneway-005",
   "subject": "reinforcedConcrete",
   "topic": "One-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes positive moment in one-way slabs for one-way slabs in reinforced-concrete design?",
   "options": [
     "Positive moment is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Negative moment is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Slab thickness is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Effective depth is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Positive moment is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-oneway-006",
   "subject": "reinforcedConcrete",
   "topic": "One-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes negative moment in one-way slabs for one-way slabs in reinforced-concrete design?",
   "options": [
     "Negative moment is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Slab thickness is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Effective depth is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Support reaction is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Negative moment is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-oneway-007",
   "subject": "reinforcedConcrete",
   "topic": "One-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes slab thickness in one-way slabs for one-way slabs in reinforced-concrete design?",
   "options": [
     "Effective depth is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Support reaction is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Slab thickness is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Minimum reinforcement is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Slab thickness is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-oneway-008",
   "subject": "reinforcedConcrete",
   "topic": "One-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes effective depth in one-way slabs for one-way slabs in reinforced-concrete design?",
   "options": [
     "Support reaction is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Effective depth is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Minimum reinforcement is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Short-span bending is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Effective depth is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-oneway-009",
   "subject": "reinforcedConcrete",
   "topic": "One-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes support reaction in one-way slabs for one-way slabs in reinforced-concrete design?",
   "options": [
     "Minimum reinforcement is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Short-span bending is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Long-span geometry is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Support reaction is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Support reaction is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-oneway-010",
   "subject": "reinforcedConcrete",
   "topic": "One-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes minimum reinforcement in one-way slabs for one-way slabs in reinforced-concrete design?",
   "options": [
     "Short-span bending is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Minimum reinforcement is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Long-span geometry is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Concentrated load is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Minimum reinforcement is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-oneway-011",
   "subject": "reinforcedConcrete",
   "topic": "One-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes short-span bending in one-way slabs for one-way slabs in reinforced-concrete design?",
   "options": [
     "Long-span geometry is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Concentrated load is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Crack control is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Short-span bending is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Short-span bending is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-oneway-012",
   "subject": "reinforcedConcrete",
   "topic": "One-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes long-span geometry in one-way slabs for one-way slabs in reinforced-concrete design?",
   "options": [
     "Concentrated load is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Crack control is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Long-span geometry is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Strip analysis is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Long-span geometry is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-oneway-013",
   "subject": "reinforcedConcrete",
   "topic": "One-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes concentrated load in one-way slabs for one-way slabs in reinforced-concrete design?",
   "options": [
     "Crack control is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Strip analysis is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "One-way action is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Concentrated load is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Concentrated load is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-oneway-014",
   "subject": "reinforcedConcrete",
   "topic": "One-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes crack control in one-way slabs for one-way slabs in reinforced-concrete design?",
   "options": [
     "Strip analysis is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "One-way action is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Main bars is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Crack control is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Crack control is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-oneway-015",
   "subject": "reinforcedConcrete",
   "topic": "One-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes strip analysis in one-way slabs for one-way slabs in reinforced-concrete design?",
   "options": [
     "One-way action is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Strip analysis is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Main bars is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Distribution bars is a relevant one-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Strip analysis is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-twoway-001",
   "subject": "reinforcedConcrete",
   "topic": "Two-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes two-way action in two-way slabs for two-way slabs in reinforced-concrete design?",
   "options": [
     "Punching shear is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Two-way action is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Column strip is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Middle strip is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Two-way action is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-twoway-002",
   "subject": "reinforcedConcrete",
   "topic": "Two-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes punching shear in two-way slabs for two-way slabs in reinforced-concrete design?",
   "options": [
     "Column strip is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Middle strip is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Negative moment is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Punching shear is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Punching shear is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-twoway-003",
   "subject": "reinforcedConcrete",
   "topic": "Two-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes column strip in two-way slabs for two-way slabs in reinforced-concrete design?",
   "options": [
     "Middle strip is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Column strip is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Negative moment is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Positive moment is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Column strip is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-twoway-004",
   "subject": "reinforcedConcrete",
   "topic": "Two-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes middle strip in two-way slabs for two-way slabs in reinforced-concrete design?",
   "options": [
     "Negative moment is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Positive moment is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Load sharing is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Middle strip is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Middle strip is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-twoway-005",
   "subject": "reinforcedConcrete",
   "topic": "Two-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes negative moment in two-way slabs for two-way slabs in reinforced-concrete design?",
   "options": [
     "Positive moment is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Load sharing is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Negative moment is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Column location is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Negative moment is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-twoway-006",
   "subject": "reinforcedConcrete",
   "topic": "Two-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes positive moment in two-way slabs for two-way slabs in reinforced-concrete design?",
   "options": [
     "Load sharing is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Column location is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Positive moment is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Drop panel is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Positive moment is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-twoway-007",
   "subject": "reinforcedConcrete",
   "topic": "Two-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes load sharing in two-way slabs for two-way slabs in reinforced-concrete design?",
   "options": [
     "Column location is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Drop panel is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Corner behavior is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Load sharing is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Load sharing is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-twoway-008",
   "subject": "reinforcedConcrete",
   "topic": "Two-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes column location in two-way slabs for two-way slabs in reinforced-concrete design?",
   "options": [
     "Drop panel is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Column location is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Corner behavior is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Flat slab is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Column location is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-twoway-009",
   "subject": "reinforcedConcrete",
   "topic": "Two-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes drop panel in two-way slabs for two-way slabs in reinforced-concrete design?",
   "options": [
     "Drop panel is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Corner behavior is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Flat slab is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Support moment is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Drop panel is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-twoway-010",
   "subject": "reinforcedConcrete",
   "topic": "Two-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes corner behavior in two-way slabs for two-way slabs in reinforced-concrete design?",
   "options": [
     "Flat slab is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Corner behavior is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Support moment is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Two-direction reinforcement is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Corner behavior is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-twoway-011",
   "subject": "reinforcedConcrete",
   "topic": "Two-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes flat slab in two-way slabs for two-way slabs in reinforced-concrete design?",
   "options": [
     "Flat slab is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Support moment is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Two-direction reinforcement is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Panel aspect ratio is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Flat slab is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-twoway-012",
   "subject": "reinforcedConcrete",
   "topic": "Two-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes support moment in two-way slabs for two-way slabs in reinforced-concrete design?",
   "options": [
     "Two-direction reinforcement is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Panel aspect ratio is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Equivalent frame is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Support moment is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Support moment is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-twoway-013",
   "subject": "reinforcedConcrete",
   "topic": "Two-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes two-direction reinforcement in two-way slabs for two-way slabs in reinforced-concrete design?",
   "options": [
     "Panel aspect ratio is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Two-direction reinforcement is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Equivalent frame is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Two-way action is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Two-direction reinforcement is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-twoway-014",
   "subject": "reinforcedConcrete",
   "topic": "Two-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes panel aspect ratio in two-way slabs for two-way slabs in reinforced-concrete design?",
   "options": [
     "Equivalent frame is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Two-way action is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Panel aspect ratio is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Punching shear is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Panel aspect ratio is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-twoway-015",
   "subject": "reinforcedConcrete",
   "topic": "Two-Way Slabs",
   "type": "mcq",
   "prompt": "Which statement best describes equivalent frame in two-way slabs for two-way slabs in reinforced-concrete design?",
   "options": [
     "Two-way action is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Equivalent frame is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Punching shear is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state",
     "Column strip is a relevant two-way slabs concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Equivalent frame is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-footings-001",
   "subject": "reinforcedConcrete",
   "topic": "Footings",
   "type": "mcq",
   "prompt": "Which statement best describes bearing pressure in footings for footings in reinforced-concrete design?",
   "options": [
     "Footing area is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Bearing pressure is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Eccentric load is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Soil pressure is a relevant footings concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Bearing pressure is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-footings-002",
   "subject": "reinforcedConcrete",
   "topic": "Footings",
   "type": "mcq",
   "prompt": "Which statement best describes footing area in footings for footings in reinforced-concrete design?",
   "options": [
     "Eccentric load is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Soil pressure is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Punching shear is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Footing area is a relevant footings concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Footing area is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-footings-003",
   "subject": "reinforcedConcrete",
   "topic": "Footings",
   "type": "mcq",
   "prompt": "Which statement best describes eccentric load in footings for footings in reinforced-concrete design?",
   "options": [
     "Soil pressure is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Punching shear is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "One-way shear is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Eccentric load is a relevant footings concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Eccentric load is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-footings-004",
   "subject": "reinforcedConcrete",
   "topic": "Footings",
   "type": "mcq",
   "prompt": "Which statement best describes soil pressure in footings for footings in reinforced-concrete design?",
   "options": [
     "Punching shear is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Soil pressure is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "One-way shear is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Bottom reinforcement is a relevant footings concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Soil pressure is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-footings-005",
   "subject": "reinforcedConcrete",
   "topic": "Footings",
   "type": "mcq",
   "prompt": "Which statement best describes punching shear in footings for footings in reinforced-concrete design?",
   "options": [
     "One-way shear is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Punching shear is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Bottom reinforcement is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Settlement is a relevant footings concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Punching shear is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-footings-006",
   "subject": "reinforcedConcrete",
   "topic": "Footings",
   "type": "mcq",
   "prompt": "Which statement best describes one-way shear in footings for footings in reinforced-concrete design?",
   "options": [
     "One-way shear is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Bottom reinforcement is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Settlement is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Combined footing is a relevant footings concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "One-way shear is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-footings-007",
   "subject": "reinforcedConcrete",
   "topic": "Footings",
   "type": "mcq",
   "prompt": "Which statement best describes bottom reinforcement in footings for footings in reinforced-concrete design?",
   "options": [
     "Bottom reinforcement is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Settlement is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Combined footing is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Column-footing transfer is a relevant footings concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Bottom reinforcement is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-footings-008",
   "subject": "reinforcedConcrete",
   "topic": "Footings",
   "type": "mcq",
   "prompt": "Which statement best describes settlement in footings for footings in reinforced-concrete design?",
   "options": [
     "Combined footing is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Column-footing transfer is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Settlement is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Footing thickness is a relevant footings concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Settlement is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-footings-009",
   "subject": "reinforcedConcrete",
   "topic": "Footings",
   "type": "mcq",
   "prompt": "Which statement best describes combined footing in footings for footings in reinforced-concrete design?",
   "options": [
     "Column-footing transfer is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Footing thickness is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Contact area is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Combined footing is a relevant footings concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Combined footing is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-footings-010",
   "subject": "reinforcedConcrete",
   "topic": "Footings",
   "type": "mcq",
   "prompt": "Which statement best describes column-footing transfer in footings for footings in reinforced-concrete design?",
   "options": [
     "Footing thickness is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Contact area is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Service load is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Column-footing transfer is a relevant footings concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Column-footing transfer is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-footings-011",
   "subject": "reinforcedConcrete",
   "topic": "Footings",
   "type": "mcq",
   "prompt": "Which statement best describes footing thickness in footings for footings in reinforced-concrete design?",
   "options": [
     "Footing thickness is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Contact area is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Service load is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Differential settlement is a relevant footings concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Footing thickness is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-footings-012",
   "subject": "reinforcedConcrete",
   "topic": "Footings",
   "type": "mcq",
   "prompt": "Which statement best describes contact area in footings for footings in reinforced-concrete design?",
   "options": [
     "Contact area is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Service load is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Differential settlement is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Development of column bars is a relevant footings concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Contact area is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-footings-013",
   "subject": "reinforcedConcrete",
   "topic": "Footings",
   "type": "mcq",
   "prompt": "Which statement best describes service load in footings for footings in reinforced-concrete design?",
   "options": [
     "Differential settlement is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Development of column bars is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Bearing pressure is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Service load is a relevant footings concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Service load is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-footings-014",
   "subject": "reinforcedConcrete",
   "topic": "Footings",
   "type": "mcq",
   "prompt": "Which statement best describes differential settlement in footings for footings in reinforced-concrete design?",
   "options": [
     "Development of column bars is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Bearing pressure is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Footing area is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Differential settlement is a relevant footings concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Differential settlement is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-footings-015",
   "subject": "reinforcedConcrete",
   "topic": "Footings",
   "type": "mcq",
   "prompt": "Which statement best describes development of column bars in footings for footings in reinforced-concrete design?",
   "options": [
     "Development of column bars is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Bearing pressure is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Footing area is a relevant footings concept that must be evaluated in its appropriate structural limit state",
     "Eccentric load is a relevant footings concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Development of column bars is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-serviceability-001",
   "subject": "reinforcedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes crack control in serviceability for serviceability in reinforced-concrete design?",
   "options": [
     "Immediate deflection is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Crack control is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Long-term deflection is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Creep is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Crack control is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-serviceability-002",
   "subject": "reinforcedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes immediate deflection in serviceability for serviceability in reinforced-concrete design?",
   "options": [
     "Long-term deflection is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Creep is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Shrinkage is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Immediate deflection is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Immediate deflection is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-serviceability-003",
   "subject": "reinforcedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes long-term deflection in serviceability for serviceability in reinforced-concrete design?",
   "options": [
     "Creep is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Long-term deflection is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Shrinkage is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Bar spacing is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Long-term deflection is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-serviceability-004",
   "subject": "reinforcedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes creep in serviceability for serviceability in reinforced-concrete design?",
   "options": [
     "Shrinkage is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Bar spacing is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Creep is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Cover is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Creep is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-serviceability-005",
   "subject": "reinforcedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes shrinkage in serviceability for serviceability in reinforced-concrete design?",
   "options": [
     "Bar spacing is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Cover is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Service load is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Shrinkage is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Shrinkage is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-serviceability-006",
   "subject": "reinforcedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes bar spacing in serviceability for serviceability in reinforced-concrete design?",
   "options": [
     "Cover is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Service load is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Bar spacing is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Vibration is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Bar spacing is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-serviceability-007",
   "subject": "reinforcedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes cover in serviceability for serviceability in reinforced-concrete design?",
   "options": [
     "Service load is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Vibration is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Finish compatibility is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Cover is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Cover is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-serviceability-008",
   "subject": "reinforcedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes service load in serviceability for serviceability in reinforced-concrete design?",
   "options": [
     "Vibration is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Service load is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Finish compatibility is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Effective stiffness is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Service load is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-serviceability-009",
   "subject": "reinforcedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes vibration in serviceability for serviceability in reinforced-concrete design?",
   "options": [
     "Vibration is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Finish compatibility is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Effective stiffness is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Crack width is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Vibration is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-serviceability-010",
   "subject": "reinforcedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes finish compatibility in serviceability for serviceability in reinforced-concrete design?",
   "options": [
     "Effective stiffness is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Crack width is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Finish compatibility is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Sustained load is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Finish compatibility is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-serviceability-011",
   "subject": "reinforcedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes effective stiffness in serviceability for serviceability in reinforced-concrete design?",
   "options": [
     "Crack width is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Effective stiffness is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Sustained load is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Durability is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Effective stiffness is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-serviceability-012",
   "subject": "reinforcedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes crack width in serviceability for serviceability in reinforced-concrete design?",
   "options": [
     "Crack width is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Sustained load is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Durability is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Time-dependent deformation is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Crack width is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-serviceability-013",
   "subject": "reinforcedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes sustained load in serviceability for serviceability in reinforced-concrete design?",
   "options": [
     "Durability is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Time-dependent deformation is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Crack control is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Sustained load is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Sustained load is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-serviceability-014",
   "subject": "reinforcedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes durability in serviceability for serviceability in reinforced-concrete design?",
   "options": [
     "Time-dependent deformation is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Crack control is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Decompression is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Durability is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Durability is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "reinforcedConcrete-serviceability-015",
   "subject": "reinforcedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes time-dependent deformation in serviceability for serviceability in reinforced-concrete design?",
   "options": [
     "Crack control is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Time-dependent deformation is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Decompression is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Camber is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Time-dependent deformation is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-fundamentals-001",
   "subject": "prestressedConcrete",
   "topic": "Fundamentals of Prestressing",
   "type": "mcq",
   "prompt": "Which statement best describes prestress purpose in fundamentals of prestressing for fundamentals of prestressing in prestressed-concrete design?",
   "options": [
     "Tendon is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Eccentricity is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Prestress purpose is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Counteracting moment is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Prestress purpose is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-fundamentals-002",
   "subject": "prestressedConcrete",
   "topic": "Fundamentals of Prestressing",
   "type": "mcq",
   "prompt": "Which statement best describes tendon in fundamentals of prestressing for fundamentals of prestressing in prestressed-concrete design?",
   "options": [
     "Eccentricity is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Tendon is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Counteracting moment is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Service cracking is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Tendon is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-fundamentals-003",
   "subject": "prestressedConcrete",
   "topic": "Fundamentals of Prestressing",
   "type": "mcq",
   "prompt": "Which statement best describes eccentricity in fundamentals of prestressing for fundamentals of prestressing in prestressed-concrete design?",
   "options": [
     "Counteracting moment is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Service cracking is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Eccentricity is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "High-strength steel is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Eccentricity is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-fundamentals-004",
   "subject": "prestressedConcrete",
   "topic": "Fundamentals of Prestressing",
   "type": "mcq",
   "prompt": "Which statement best describes counteracting moment in fundamentals of prestressing for fundamentals of prestressing in prestressed-concrete design?",
   "options": [
     "Service cracking is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "High-strength steel is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Counteracting moment is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Effective prestress is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Counteracting moment is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-fundamentals-005",
   "subject": "prestressedConcrete",
   "topic": "Fundamentals of Prestressing",
   "type": "mcq",
   "prompt": "Which statement best describes service cracking in fundamentals of prestressing for fundamentals of prestressing in prestressed-concrete design?",
   "options": [
     "Service cracking is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "High-strength steel is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Effective prestress is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Prestress loss is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Service cracking is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-fundamentals-006",
   "subject": "prestressedConcrete",
   "topic": "Fundamentals of Prestressing",
   "type": "mcq",
   "prompt": "Which statement best describes high-strength steel in fundamentals of prestressing for fundamentals of prestressing in prestressed-concrete design?",
   "options": [
     "Effective prestress is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Prestress loss is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "High-strength steel is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Concentric prestress is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "High-strength steel is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-fundamentals-007",
   "subject": "prestressedConcrete",
   "topic": "Fundamentals of Prestressing",
   "type": "mcq",
   "prompt": "Which statement best describes effective prestress in fundamentals of prestressing for fundamentals of prestressing in prestressed-concrete design?",
   "options": [
     "Prestress loss is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Effective prestress is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Concentric prestress is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Eccentric prestress is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Effective prestress is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-fundamentals-008",
   "subject": "prestressedConcrete",
   "topic": "Fundamentals of Prestressing",
   "type": "mcq",
   "prompt": "Which statement best describes prestress loss in fundamentals of prestressing for fundamentals of prestressing in prestressed-concrete design?",
   "options": [
     "Concentric prestress is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Eccentric prestress is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Prestress loss is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Camber is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Prestress loss is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-fundamentals-009",
   "subject": "prestressedConcrete",
   "topic": "Fundamentals of Prestressing",
   "type": "mcq",
   "prompt": "Which statement best describes concentric prestress in fundamentals of prestressing for fundamentals of prestressing in prestressed-concrete design?",
   "options": [
     "Eccentric prestress is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Camber is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Concentric prestress is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Serviceability is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Concentric prestress is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-fundamentals-010",
   "subject": "prestressedConcrete",
   "topic": "Fundamentals of Prestressing",
   "type": "mcq",
   "prompt": "Which statement best describes eccentric prestress in fundamentals of prestressing for fundamentals of prestressing in prestressed-concrete design?",
   "options": [
     "Camber is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Eccentric prestress is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Serviceability is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Active reinforcement is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Eccentric prestress is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-fundamentals-011",
   "subject": "prestressedConcrete",
   "topic": "Fundamentals of Prestressing",
   "type": "mcq",
   "prompt": "Which statement best describes camber in fundamentals of prestressing for fundamentals of prestressing in prestressed-concrete design?",
   "options": [
     "Camber is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Serviceability is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Active reinforcement is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Long-span efficiency is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Camber is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-fundamentals-012",
   "subject": "prestressedConcrete",
   "topic": "Fundamentals of Prestressing",
   "type": "mcq",
   "prompt": "Which statement best describes serviceability in fundamentals of prestressing for fundamentals of prestressing in prestressed-concrete design?",
   "options": [
     "Active reinforcement is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Long-span efficiency is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Serviceability is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Stress superposition is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Serviceability is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-fundamentals-013",
   "subject": "prestressedConcrete",
   "topic": "Fundamentals of Prestressing",
   "type": "mcq",
   "prompt": "Which statement best describes active reinforcement in fundamentals of prestressing for fundamentals of prestressing in prestressed-concrete design?",
   "options": [
     "Active reinforcement is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Long-span efficiency is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Stress superposition is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Prestress purpose is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Active reinforcement is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-fundamentals-014",
   "subject": "prestressedConcrete",
   "topic": "Fundamentals of Prestressing",
   "type": "mcq",
   "prompt": "Which statement best describes long-span efficiency in fundamentals of prestressing for fundamentals of prestressing in prestressed-concrete design?",
   "options": [
     "Long-span efficiency is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Stress superposition is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Prestress purpose is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Tendon is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Long-span efficiency is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-fundamentals-015",
   "subject": "prestressedConcrete",
   "topic": "Fundamentals of Prestressing",
   "type": "mcq",
   "prompt": "Which statement best describes stress superposition in fundamentals of prestressing for fundamentals of prestressing in prestressed-concrete design?",
   "options": [
     "Prestress purpose is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Tendon is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Stress superposition is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state",
     "Eccentricity is a relevant fundamentals of prestressing concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Stress superposition is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-systems-001",
   "subject": "prestressedConcrete",
   "topic": "Prestressing Systems",
   "type": "mcq",
   "prompt": "Which statement best describes pre-tensioning in prestressing systems for prestressing systems in prestressed-concrete design?",
   "options": [
     "Post-tensioning is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Anchorage is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Duct is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Pre-tensioning is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Pre-tensioning is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-systems-002",
   "subject": "prestressedConcrete",
   "topic": "Prestressing Systems",
   "type": "mcq",
   "prompt": "Which statement best describes post-tensioning in prestressing systems for prestressing systems in prestressed-concrete design?",
   "options": [
     "Anchorage is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Duct is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Post-tensioning is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Grout is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Post-tensioning is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-systems-003",
   "subject": "prestressedConcrete",
   "topic": "Prestressing Systems",
   "type": "mcq",
   "prompt": "Which statement best describes anchorage in prestressing systems for prestressing systems in prestressed-concrete design?",
   "options": [
     "Duct is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Grout is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Anchorage is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Unbonded tendon is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Anchorage is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-systems-004",
   "subject": "prestressedConcrete",
   "topic": "Prestressing Systems",
   "type": "mcq",
   "prompt": "Which statement best describes duct in prestressing systems for prestressing systems in prestressed-concrete design?",
   "options": [
     "Grout is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Unbonded tendon is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Bonded tendon is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Duct is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Duct is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-systems-005",
   "subject": "prestressedConcrete",
   "topic": "Prestressing Systems",
   "type": "mcq",
   "prompt": "Which statement best describes grout in prestressing systems for prestressing systems in prestressed-concrete design?",
   "options": [
     "Unbonded tendon is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Bonded tendon is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Transfer length is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Grout is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Grout is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-systems-006",
   "subject": "prestressedConcrete",
   "topic": "Prestressing Systems",
   "type": "mcq",
   "prompt": "Which statement best describes unbonded tendon in prestressing systems for prestressing systems in prestressed-concrete design?",
   "options": [
     "Bonded tendon is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Unbonded tendon is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Transfer length is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Stressing jack is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Unbonded tendon is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-systems-007",
   "subject": "prestressedConcrete",
   "topic": "Prestressing Systems",
   "type": "mcq",
   "prompt": "Which statement best describes bonded tendon in prestressing systems for prestressing systems in prestressed-concrete design?",
   "options": [
     "Transfer length is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Bonded tendon is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Stressing jack is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Deviator is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Bonded tendon is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-systems-008",
   "subject": "prestressedConcrete",
   "topic": "Prestressing Systems",
   "type": "mcq",
   "prompt": "Which statement best describes transfer length in prestressing systems for prestressing systems in prestressed-concrete design?",
   "options": [
     "Stressing jack is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Deviator is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Transfer length is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Tendon profile is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Transfer length is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-systems-009",
   "subject": "prestressedConcrete",
   "topic": "Prestressing Systems",
   "type": "mcq",
   "prompt": "Which statement best describes stressing jack in prestressing systems for prestressing systems in prestressed-concrete design?",
   "options": [
     "Deviator is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Tendon profile is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Anchorage seating is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Stressing jack is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Stressing jack is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-systems-010",
   "subject": "prestressedConcrete",
   "topic": "Prestressing Systems",
   "type": "mcq",
   "prompt": "Which statement best describes deviator in prestressing systems for prestressing systems in prestressed-concrete design?",
   "options": [
     "Deviator is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Tendon profile is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Anchorage seating is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "End zone is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Deviator is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-systems-011",
   "subject": "prestressedConcrete",
   "topic": "Prestressing Systems",
   "type": "mcq",
   "prompt": "Which statement best describes tendon profile in prestressing systems for prestressing systems in prestressed-concrete design?",
   "options": [
     "Anchorage seating is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "End zone is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Construction sequence is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Tendon profile is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Tendon profile is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-systems-012",
   "subject": "prestressedConcrete",
   "topic": "Prestressing Systems",
   "type": "mcq",
   "prompt": "Which statement best describes anchorage seating in prestressing systems for prestressing systems in prestressed-concrete design?",
   "options": [
     "Anchorage seating is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "End zone is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Construction sequence is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "The connection must transmit the member force without exceeding any applicable limit state"
   ],
   "correct": 0,
   "explanation": "Anchorage seating is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-systems-013",
   "subject": "prestressedConcrete",
   "topic": "Prestressing Systems",
   "type": "mcq",
   "prompt": "Which statement best describes end zone in prestressing systems for prestressing systems in prestressed-concrete design?",
   "options": [
     "Construction sequence is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "The connection must transmit the member force without exceeding any applicable limit state",
     "End zone is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Pre-tensioning is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "End zone is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-systems-014",
   "subject": "prestressedConcrete",
   "topic": "Prestressing Systems",
   "type": "mcq",
   "prompt": "Which statement best describes construction sequence in prestressing systems for prestressing systems in prestressed-concrete design?",
   "options": [
     "The connection must transmit the member force without exceeding any applicable limit state",
     "Pre-tensioning is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Construction sequence is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Post-tensioning is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Construction sequence is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-systems-015",
   "subject": "prestressedConcrete",
   "topic": "Prestressing Systems",
   "type": "mcq",
   "prompt": "Why is force transfer important at a steel connection for prestressing systems in prestressed-concrete design?",
   "options": [
     "Pre-tensioning is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "Post-tensioning is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state",
     "The connection must transmit the member force without exceeding any applicable limit state",
     "Anchorage is a relevant prestressing systems concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "A continuous force path is required."
 },
 {
   "id": "prestressed-materials-001",
   "subject": "prestressedConcrete",
   "topic": "Materials",
   "type": "mcq",
   "prompt": "Which statement best describes prestressing steel in materials for materials in prestressed-concrete design?",
   "options": [
     "Prestressing steel is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Relaxation is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Concrete strength is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Concrete modulus is a relevant materials concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Prestressing steel is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-materials-002",
   "subject": "prestressedConcrete",
   "topic": "Materials",
   "type": "mcq",
   "prompt": "Which statement best describes relaxation in materials for materials in prestressed-concrete design?",
   "options": [
     "Relaxation is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Concrete strength is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Concrete modulus is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Creep is a relevant materials concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Relaxation is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-materials-003",
   "subject": "prestressedConcrete",
   "topic": "Materials",
   "type": "mcq",
   "prompt": "Which statement best describes concrete strength in materials for materials in prestressed-concrete design?",
   "options": [
     "Concrete modulus is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Creep is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Shrinkage is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Concrete strength is a relevant materials concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Concrete strength is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-materials-004",
   "subject": "prestressedConcrete",
   "topic": "Materials",
   "type": "mcq",
   "prompt": "Which statement best describes concrete modulus in materials for materials in prestressed-concrete design?",
   "options": [
     "Concrete modulus is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Creep is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Shrinkage is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Water-cement ratio is a relevant materials concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Concrete modulus is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-materials-005",
   "subject": "prestressedConcrete",
   "topic": "Materials",
   "type": "mcq",
   "prompt": "Which statement best describes creep in materials for materials in prestressed-concrete design?",
   "options": [
     "Creep is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Shrinkage is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Water-cement ratio is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Aggregate is a relevant materials concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Creep is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-materials-006",
   "subject": "prestressedConcrete",
   "topic": "Materials",
   "type": "mcq",
   "prompt": "Which statement best describes shrinkage in materials for materials in prestressed-concrete design?",
   "options": [
     "Water-cement ratio is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Aggregate is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Cement paste is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Shrinkage is a relevant materials concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Shrinkage is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-materials-007",
   "subject": "prestressedConcrete",
   "topic": "Materials",
   "type": "mcq",
   "prompt": "Which statement best describes water-cement ratio in materials for materials in prestressed-concrete design?",
   "options": [
     "Aggregate is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Cement paste is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Curing is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Water-cement ratio is a relevant materials concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Water-cement ratio is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-materials-008",
   "subject": "prestressedConcrete",
   "topic": "Materials",
   "type": "mcq",
   "prompt": "Which statement best describes aggregate in materials for materials in prestressed-concrete design?",
   "options": [
     "Cement paste is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Aggregate is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Curing is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Corrosion protection is a relevant materials concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Aggregate is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-materials-009",
   "subject": "prestressedConcrete",
   "topic": "Materials",
   "type": "mcq",
   "prompt": "Which statement best describes cement paste in materials for materials in prestressed-concrete design?",
   "options": [
     "Curing is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Corrosion protection is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Cement paste is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Strand is a relevant materials concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Cement paste is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-materials-010",
   "subject": "prestressedConcrete",
   "topic": "Materials",
   "type": "mcq",
   "prompt": "Which statement best describes curing in materials for materials in prestressed-concrete design?",
   "options": [
     "Corrosion protection is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Curing is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Strand is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Wire is a relevant materials concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Curing is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-materials-011",
   "subject": "prestressedConcrete",
   "topic": "Materials",
   "type": "mcq",
   "prompt": "Which statement best describes corrosion protection in materials for materials in prestressed-concrete design?",
   "options": [
     "Strand is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Wire is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Corrosion protection is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "High-strength concrete is a relevant materials concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Corrosion protection is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-materials-012",
   "subject": "prestressedConcrete",
   "topic": "Materials",
   "type": "mcq",
   "prompt": "Which statement best describes strand in materials for materials in prestressed-concrete design?",
   "options": [
     "Wire is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "High-strength concrete is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Material durability is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Strand is a relevant materials concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Strand is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-materials-013",
   "subject": "prestressedConcrete",
   "topic": "Materials",
   "type": "mcq",
   "prompt": "Which statement best describes wire in materials for materials in prestressed-concrete design?",
   "options": [
     "High-strength concrete is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Wire is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Material durability is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Prestressing steel is a relevant materials concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Wire is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-materials-014",
   "subject": "prestressedConcrete",
   "topic": "Materials",
   "type": "mcq",
   "prompt": "Which statement best describes high-strength concrete in materials for materials in prestressed-concrete design?",
   "options": [
     "High-strength concrete is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Material durability is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Prestressing steel is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Relaxation is a relevant materials concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "High-strength concrete is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-materials-015",
   "subject": "prestressedConcrete",
   "topic": "Materials",
   "type": "mcq",
   "prompt": "Which statement best describes material durability in materials for materials in prestressed-concrete design?",
   "options": [
     "Material durability is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Prestressing steel is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Relaxation is a relevant materials concept that must be evaluated in its appropriate structural limit state",
     "Concrete strength is a relevant materials concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Material durability is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-stress-001",
   "subject": "prestressedConcrete",
   "topic": "Concrete Stress Due to Prestress",
   "type": "mcq",
   "prompt": "Which statement best describes P/A stress in concrete stress due to prestress for concrete stress due to prestress in prestressed-concrete design?",
   "options": [
     "P/a stress is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Eccentricity is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Pe moment is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "M/z stress is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "P/a stress is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-stress-002",
   "subject": "prestressedConcrete",
   "topic": "Concrete Stress Due to Prestress",
   "type": "mcq",
   "prompt": "Which statement best describes eccentricity in concrete stress due to prestress for concrete stress due to prestress in prestressed-concrete design?",
   "options": [
     "Pe moment is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Eccentricity is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "M/z stress is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Concentric force is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Eccentricity is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-stress-003",
   "subject": "prestressedConcrete",
   "topic": "Concrete Stress Due to Prestress",
   "type": "mcq",
   "prompt": "Which statement best describes Pe moment in concrete stress due to prestress for concrete stress due to prestress in prestressed-concrete design?",
   "options": [
     "M/z stress is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Concentric force is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Tendon below centroid is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Pe moment is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Pe moment is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-stress-004",
   "subject": "prestressedConcrete",
   "topic": "Concrete Stress Due to Prestress",
   "type": "mcq",
   "prompt": "Which statement best describes M/Z stress in concrete stress due to prestress for concrete stress due to prestress in prestressed-concrete design?",
   "options": [
     "M/z stress is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Concentric force is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Tendon below centroid is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Stress superposition is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "M/z stress is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-stress-005",
   "subject": "prestressedConcrete",
   "topic": "Concrete Stress Due to Prestress",
   "type": "mcq",
   "prompt": "Which statement best describes concentric force in concrete stress due to prestress for concrete stress due to prestress in prestressed-concrete design?",
   "options": [
     "Tendon below centroid is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Stress superposition is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Kern is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Concentric force is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Concentric force is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-stress-006",
   "subject": "prestressedConcrete",
   "topic": "Concrete Stress Due to Prestress",
   "type": "mcq",
   "prompt": "Which statement best describes tendon below centroid in concrete stress due to prestress for concrete stress due to prestress in prestressed-concrete design?",
   "options": [
     "Stress superposition is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Kern is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Fiber stress is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Tendon below centroid is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Tendon below centroid is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-stress-007",
   "subject": "prestressedConcrete",
   "topic": "Concrete Stress Due to Prestress",
   "type": "mcq",
   "prompt": "Which statement best describes stress superposition in concrete stress due to prestress for concrete stress due to prestress in prestressed-concrete design?",
   "options": [
     "Kern is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Stress superposition is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Fiber stress is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Prestress moment is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Stress superposition is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-stress-008",
   "subject": "prestressedConcrete",
   "topic": "Concrete Stress Due to Prestress",
   "type": "mcq",
   "prompt": "Which statement best describes kern in concrete stress due to prestress for concrete stress due to prestress in prestressed-concrete design?",
   "options": [
     "Fiber stress is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Prestress moment is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Service gravity moment is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Kern is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Kern is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-stress-009",
   "subject": "prestressedConcrete",
   "topic": "Concrete Stress Due to Prestress",
   "type": "mcq",
   "prompt": "Which statement best describes fiber stress in concrete stress due to prestress for concrete stress due to prestress in prestressed-concrete design?",
   "options": [
     "Fiber stress is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Prestress moment is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Service gravity moment is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Stress sign is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Fiber stress is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-stress-010",
   "subject": "prestressedConcrete",
   "topic": "Concrete Stress Due to Prestress",
   "type": "mcq",
   "prompt": "Which statement best describes prestress moment in concrete stress due to prestress for concrete stress due to prestress in prestressed-concrete design?",
   "options": [
     "Prestress moment is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Service gravity moment is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Stress sign is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Tendon profile is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Prestress moment is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-stress-011",
   "subject": "prestressedConcrete",
   "topic": "Concrete Stress Due to Prestress",
   "type": "mcq",
   "prompt": "Which statement best describes service gravity moment in concrete stress due to prestress for concrete stress due to prestress in prestressed-concrete design?",
   "options": [
     "Stress sign is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Tendon profile is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "It relates bending moment to extreme-fiber bending stress",
     "Service gravity moment is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Service gravity moment is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-stress-012",
   "subject": "prestressedConcrete",
   "topic": "Concrete Stress Due to Prestress",
   "type": "mcq",
   "prompt": "Which statement best describes stress sign in concrete stress due to prestress for concrete stress due to prestress in prestressed-concrete design?",
   "options": [
     "Tendon profile is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Stress sign is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "It relates bending moment to extreme-fiber bending stress",
     "Effective force is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Stress sign is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-stress-013",
   "subject": "prestressedConcrete",
   "topic": "Concrete Stress Due to Prestress",
   "type": "mcq",
   "prompt": "Which statement best describes tendon profile in concrete stress due to prestress for concrete stress due to prestress in prestressed-concrete design?",
   "options": [
     "Tendon profile is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "It relates bending moment to extreme-fiber bending stress",
     "Effective force is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "P/a stress is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Tendon profile is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-stress-014",
   "subject": "prestressedConcrete",
   "topic": "Concrete Stress Due to Prestress",
   "type": "mcq",
   "prompt": "What is the role of section modulus in elastic bending for concrete stress due to prestress in prestressed-concrete design?",
   "options": [
     "It relates bending moment to extreme-fiber bending stress",
     "Effective force is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "P/a stress is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Eccentricity is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Elastic bending stress is M/S."
 },
 {
   "id": "prestressed-stress-015",
   "subject": "prestressedConcrete",
   "topic": "Concrete Stress Due to Prestress",
   "type": "mcq",
   "prompt": "Which statement best describes effective force in concrete stress due to prestress for concrete stress due to prestress in prestressed-concrete design?",
   "options": [
     "Effective force is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "P/a stress is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Eccentricity is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state",
     "Pe moment is a relevant concrete stress due to prestress concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Effective force is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-losses-001",
   "subject": "prestressedConcrete",
   "topic": "Prestress Losses",
   "type": "mcq",
   "prompt": "Which statement best describes friction loss in prestress losses for prestress losses in prestressed-concrete design?",
   "options": [
     "Anchorage seating is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Friction loss is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Elastic shortening is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Concrete creep is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Friction loss is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-losses-002",
   "subject": "prestressedConcrete",
   "topic": "Prestress Losses",
   "type": "mcq",
   "prompt": "Which statement best describes anchorage seating in prestress losses for prestress losses in prestressed-concrete design?",
   "options": [
     "Elastic shortening is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Concrete creep is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Concrete shrinkage is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Anchorage seating is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Anchorage seating is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-losses-003",
   "subject": "prestressedConcrete",
   "topic": "Prestress Losses",
   "type": "mcq",
   "prompt": "Which statement best describes elastic shortening in prestress losses for prestress losses in prestressed-concrete design?",
   "options": [
     "Concrete creep is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Concrete shrinkage is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Elastic shortening is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Steel relaxation is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Elastic shortening is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-losses-004",
   "subject": "prestressedConcrete",
   "topic": "Prestress Losses",
   "type": "mcq",
   "prompt": "Which statement best describes concrete creep in prestress losses for prestress losses in prestressed-concrete design?",
   "options": [
     "Concrete shrinkage is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Steel relaxation is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Immediate losses is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Concrete creep is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Concrete creep is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-losses-005",
   "subject": "prestressedConcrete",
   "topic": "Prestress Losses",
   "type": "mcq",
   "prompt": "Which statement best describes concrete shrinkage in prestress losses for prestress losses in prestressed-concrete design?",
   "options": [
     "Steel relaxation is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Concrete shrinkage is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Immediate losses is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Time-dependent losses is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Concrete shrinkage is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-losses-006",
   "subject": "prestressedConcrete",
   "topic": "Prestress Losses",
   "type": "mcq",
   "prompt": "Which statement best describes steel relaxation in prestress losses for prestress losses in prestressed-concrete design?",
   "options": [
     "Immediate losses is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Time-dependent losses is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Steel relaxation is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Effective force is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Steel relaxation is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-losses-007",
   "subject": "prestressedConcrete",
   "topic": "Prestress Losses",
   "type": "mcq",
   "prompt": "Which statement best describes immediate losses in prestress losses for prestress losses in prestressed-concrete design?",
   "options": [
     "Time-dependent losses is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Effective force is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Effective stress is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Immediate losses is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Immediate losses is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-losses-008",
   "subject": "prestressedConcrete",
   "topic": "Prestress Losses",
   "type": "mcq",
   "prompt": "Which statement best describes time-dependent losses in prestress losses for prestress losses in prestressed-concrete design?",
   "options": [
     "Effective force is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Effective stress is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Time-dependent losses is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Curved tendon friction is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Time-dependent losses is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-losses-009",
   "subject": "prestressedConcrete",
   "topic": "Prestress Losses",
   "type": "mcq",
   "prompt": "Which statement best describes effective force in prestress losses for prestress losses in prestressed-concrete design?",
   "options": [
     "Effective stress is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Curved tendon friction is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Effective force is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Wobble is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Effective force is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-losses-010",
   "subject": "prestressedConcrete",
   "topic": "Prestress Losses",
   "type": "mcq",
   "prompt": "Which statement best describes effective stress in prestress losses for prestress losses in prestressed-concrete design?",
   "options": [
     "Curved tendon friction is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Wobble is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Initial force is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Effective stress is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Effective stress is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-losses-011",
   "subject": "prestressedConcrete",
   "topic": "Prestress Losses",
   "type": "mcq",
   "prompt": "Which statement best describes curved tendon friction in prestress losses for prestress losses in prestressed-concrete design?",
   "options": [
     "Curved tendon friction is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Wobble is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Initial force is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Loss percentage is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Curved tendon friction is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-losses-012",
   "subject": "prestressedConcrete",
   "topic": "Prestress Losses",
   "type": "mcq",
   "prompt": "Which statement best describes wobble in prestress losses for prestress losses in prestressed-concrete design?",
   "options": [
     "Initial force is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Loss percentage is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Loss accumulation is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Wobble is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Wobble is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-losses-013",
   "subject": "prestressedConcrete",
   "topic": "Prestress Losses",
   "type": "mcq",
   "prompt": "Which statement best describes initial force in prestress losses for prestress losses in prestressed-concrete design?",
   "options": [
     "Loss percentage is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Initial force is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Loss accumulation is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Friction loss is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Initial force is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-losses-014",
   "subject": "prestressedConcrete",
   "topic": "Prestress Losses",
   "type": "mcq",
   "prompt": "Which statement best describes loss percentage in prestress losses for prestress losses in prestressed-concrete design?",
   "options": [
     "Loss percentage is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Loss accumulation is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Friction loss is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Anchorage seating is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Loss percentage is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-losses-015",
   "subject": "prestressedConcrete",
   "topic": "Prestress Losses",
   "type": "mcq",
   "prompt": "Which statement best describes loss accumulation in prestress losses for prestress losses in prestressed-concrete design?",
   "options": [
     "Friction loss is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Anchorage seating is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Elastic shortening is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state",
     "Loss accumulation is a relevant prestress losses concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Loss accumulation is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-behavior-001",
   "subject": "prestressedConcrete",
   "topic": "Flexural Behavior",
   "type": "mcq",
   "prompt": "Which statement best describes service cracking in flexural behavior for flexural behavior in prestressed-concrete design?",
   "options": [
     "Service cracking is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Camber is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Prestress moment is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Decompression is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Service cracking is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-behavior-002",
   "subject": "prestressedConcrete",
   "topic": "Flexural Behavior",
   "type": "mcq",
   "prompt": "Which statement best describes camber in flexural behavior for flexural behavior in prestressed-concrete design?",
   "options": [
     "Camber is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Prestress moment is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Decompression is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Tendon strain is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Camber is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-behavior-003",
   "subject": "prestressedConcrete",
   "topic": "Flexural Behavior",
   "type": "mcq",
   "prompt": "Which statement best describes prestress moment in flexural behavior for flexural behavior in prestressed-concrete design?",
   "options": [
     "Decompression is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Tendon strain is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Bonded tendon is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Prestress moment is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Prestress moment is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-behavior-004",
   "subject": "prestressedConcrete",
   "topic": "Flexural Behavior",
   "type": "mcq",
   "prompt": "Which statement best describes decompression in flexural behavior for flexural behavior in prestressed-concrete design?",
   "options": [
     "Tendon strain is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Decompression is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Bonded tendon is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Unbonded tendon is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Decompression is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-behavior-005",
   "subject": "prestressedConcrete",
   "topic": "Flexural Behavior",
   "type": "mcq",
   "prompt": "Which statement best describes tendon strain in flexural behavior for flexural behavior in prestressed-concrete design?",
   "options": [
     "Bonded tendon is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Unbonded tendon is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Tendon strain is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Gravity moment is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Tendon strain is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-behavior-006",
   "subject": "prestressedConcrete",
   "topic": "Flexural Behavior",
   "type": "mcq",
   "prompt": "Which statement best describes bonded tendon in flexural behavior for flexural behavior in prestressed-concrete design?",
   "options": [
     "Unbonded tendon is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Bonded tendon is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Gravity moment is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Net moment is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Bonded tendon is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-behavior-007",
   "subject": "prestressedConcrete",
   "topic": "Flexural Behavior",
   "type": "mcq",
   "prompt": "Which statement best describes unbonded tendon in flexural behavior for flexural behavior in prestressed-concrete design?",
   "options": [
     "Gravity moment is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Net moment is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Crack control is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Unbonded tendon is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Unbonded tendon is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-behavior-008",
   "subject": "prestressedConcrete",
   "topic": "Flexural Behavior",
   "type": "mcq",
   "prompt": "Which statement best describes gravity moment in flexural behavior for flexural behavior in prestressed-concrete design?",
   "options": [
     "Net moment is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Crack control is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Gravity moment is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Curved tendon is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Gravity moment is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-behavior-009",
   "subject": "prestressedConcrete",
   "topic": "Flexural Behavior",
   "type": "mcq",
   "prompt": "Which statement best describes net moment in flexural behavior for flexural behavior in prestressed-concrete design?",
   "options": [
     "Net moment is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Crack control is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Curved tendon is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Support reaction is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Net moment is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-behavior-010",
   "subject": "prestressedConcrete",
   "topic": "Flexural Behavior",
   "type": "mcq",
   "prompt": "Which statement best describes crack control in flexural behavior for flexural behavior in prestressed-concrete design?",
   "options": [
     "Curved tendon is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Support reaction is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Crack control is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Counteracting curvature is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Crack control is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-behavior-011",
   "subject": "prestressedConcrete",
   "topic": "Flexural Behavior",
   "type": "mcq",
   "prompt": "Which statement best describes curved tendon in flexural behavior for flexural behavior in prestressed-concrete design?",
   "options": [
     "Curved tendon is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Support reaction is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Counteracting curvature is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Service stress is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Curved tendon is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-behavior-012",
   "subject": "prestressedConcrete",
   "topic": "Flexural Behavior",
   "type": "mcq",
   "prompt": "Which statement best describes support reaction in flexural behavior for flexural behavior in prestressed-concrete design?",
   "options": [
     "Counteracting curvature is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Service stress is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Support reaction is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Flexural compatibility is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Support reaction is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-behavior-013",
   "subject": "prestressedConcrete",
   "topic": "Flexural Behavior",
   "type": "mcq",
   "prompt": "Which statement best describes counteracting curvature in flexural behavior for flexural behavior in prestressed-concrete design?",
   "options": [
     "Counteracting curvature is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Service stress is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Flexural compatibility is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Service cracking is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Counteracting curvature is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-behavior-014",
   "subject": "prestressedConcrete",
   "topic": "Flexural Behavior",
   "type": "mcq",
   "prompt": "Which statement best describes service stress in flexural behavior for flexural behavior in prestressed-concrete design?",
   "options": [
     "Flexural compatibility is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Service cracking is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Camber is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Service stress is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Service stress is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-behavior-015",
   "subject": "prestressedConcrete",
   "topic": "Flexural Behavior",
   "type": "mcq",
   "prompt": "Which statement best describes flexural compatibility in flexural behavior for flexural behavior in prestressed-concrete design?",
   "options": [
     "Service cracking is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Camber is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Flexural compatibility is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state",
     "Prestress moment is a relevant flexural behavior concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Flexural compatibility is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-strength-001",
   "subject": "prestressedConcrete",
   "topic": "Flexural Strength",
   "type": "mcq",
   "prompt": "Which statement best describes ultimate behavior in flexural strength for flexural strength in prestressed-concrete design?",
   "options": [
     "Ultimate behavior is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Tendon stress at ultimate is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Compression block is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Deformations at a common interface remain compatible"
   ],
   "correct": 0,
   "explanation": "Ultimate behavior is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-strength-002",
   "subject": "prestressedConcrete",
   "topic": "Flexural Strength",
   "type": "mcq",
   "prompt": "Which statement best describes tendon stress at ultimate in flexural strength for flexural strength in prestressed-concrete design?",
   "options": [
     "Tendon stress at ultimate is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Compression block is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Deformations at a common interface remain compatible",
     "Internal lever arm is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Tendon stress at ultimate is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-strength-003",
   "subject": "prestressedConcrete",
   "topic": "Flexural Strength",
   "type": "mcq",
   "prompt": "Which statement best describes compression block in flexural strength for flexural strength in prestressed-concrete design?",
   "options": [
     "Deformations at a common interface remain compatible",
     "Internal lever arm is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Compression block is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Tension resultant is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Compression block is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-strength-004",
   "subject": "prestressedConcrete",
   "topic": "Flexural Strength",
   "type": "mcq",
   "prompt": "What does strain compatibility mean in a bonded composite section for flexural strength in prestressed-concrete design?",
   "options": [
     "Internal lever arm is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Tension resultant is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Deformations at a common interface remain compatible",
     "Compression resultant is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Compatibility links strains among materials that act together."
 },
 {
   "id": "prestressed-flexural-strength-005",
   "subject": "prestressedConcrete",
   "topic": "Flexural Strength",
   "type": "mcq",
   "prompt": "Which statement best describes internal lever arm in flexural strength for flexural strength in prestressed-concrete design?",
   "options": [
     "Tension resultant is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Compression resultant is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Internal lever arm is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Tendon rupture is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Internal lever arm is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-strength-006",
   "subject": "prestressedConcrete",
   "topic": "Flexural Strength",
   "type": "mcq",
   "prompt": "Which statement best describes tension resultant in flexural strength for flexural strength in prestressed-concrete design?",
   "options": [
     "Compression resultant is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Tendon rupture is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Tension resultant is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Compression failure is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Tension resultant is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-strength-007",
   "subject": "prestressedConcrete",
   "topic": "Flexural Strength",
   "type": "mcq",
   "prompt": "Which statement best describes compression resultant in flexural strength for flexural strength in prestressed-concrete design?",
   "options": [
     "Tendon rupture is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Compression failure is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Passive reinforcement is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Compression resultant is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Compression resultant is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-strength-008",
   "subject": "prestressedConcrete",
   "topic": "Flexural Strength",
   "type": "mcq",
   "prompt": "Which statement best describes tendon rupture in flexural strength for flexural strength in prestressed-concrete design?",
   "options": [
     "Compression failure is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Passive reinforcement is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Ultimate equilibrium is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Tendon rupture is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Tendon rupture is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-strength-009",
   "subject": "prestressedConcrete",
   "topic": "Flexural Strength",
   "type": "mcq",
   "prompt": "Which statement best describes compression failure in flexural strength for flexural strength in prestressed-concrete design?",
   "options": [
     "Passive reinforcement is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Ultimate equilibrium is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Compression failure is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Anchorage strength is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Compression failure is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-strength-010",
   "subject": "prestressedConcrete",
   "topic": "Flexural Strength",
   "type": "mcq",
   "prompt": "Which statement best describes passive reinforcement in flexural strength for flexural strength in prestressed-concrete design?",
   "options": [
     "Ultimate equilibrium is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Anchorage strength is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Eccentricity is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Passive reinforcement is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Passive reinforcement is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-strength-011",
   "subject": "prestressedConcrete",
   "topic": "Flexural Strength",
   "type": "mcq",
   "prompt": "Which statement best describes ultimate equilibrium in flexural strength for flexural strength in prestressed-concrete design?",
   "options": [
     "Anchorage strength is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Ultimate equilibrium is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Eccentricity is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "It permits substantial inelastic deformation before fracture"
   ],
   "correct": 1,
   "explanation": "Ultimate equilibrium is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-strength-012",
   "subject": "prestressedConcrete",
   "topic": "Flexural Strength",
   "type": "mcq",
   "prompt": "Which statement best describes anchorage strength in flexural strength for flexural strength in prestressed-concrete design?",
   "options": [
     "Anchorage strength is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Eccentricity is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "It permits substantial inelastic deformation before fracture",
     "Moment capacity is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Anchorage strength is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-strength-013",
   "subject": "prestressedConcrete",
   "topic": "Flexural Strength",
   "type": "mcq",
   "prompt": "Which statement best describes eccentricity in flexural strength for flexural strength in prestressed-concrete design?",
   "options": [
     "It permits substantial inelastic deformation before fracture",
     "Eccentricity is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Moment capacity is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Ultimate behavior is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Eccentricity is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-flexural-strength-014",
   "subject": "prestressedConcrete",
   "topic": "Flexural Strength",
   "type": "mcq",
   "prompt": "Why is ductility important in structural steel for flexural strength in prestressed-concrete design?",
   "options": [
     "Moment capacity is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Ultimate behavior is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "It permits substantial inelastic deformation before fracture",
     "Tendon stress at ultimate is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Ductility can provide deformation capacity and redistribution."
 },
 {
   "id": "prestressed-flexural-strength-015",
   "subject": "prestressedConcrete",
   "topic": "Flexural Strength",
   "type": "mcq",
   "prompt": "Which statement best describes moment capacity in flexural strength for flexural strength in prestressed-concrete design?",
   "options": [
     "Ultimate behavior is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Tendon stress at ultimate is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Compression block is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state",
     "Moment capacity is a relevant flexural strength concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Moment capacity is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-shear-001",
   "subject": "prestressedConcrete",
   "topic": "Shear in Prestressed Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes diagonal cracking in shear in prestressed concrete for shear in prestressed concrete in prestressed-concrete design?",
   "options": [
     "Diagonal cracking is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Web shear is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Prestress compression is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Shear reinforcement is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Diagonal cracking is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-shear-002",
   "subject": "prestressedConcrete",
   "topic": "Shear in Prestressed Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes web shear in shear in prestressed concrete for shear in prestressed concrete in prestressed-concrete design?",
   "options": [
     "Web shear is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Prestress compression is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Shear reinforcement is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Shear-compression failure is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Web shear is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-shear-003",
   "subject": "prestressedConcrete",
   "topic": "Shear in Prestressed Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes prestress compression in shear in prestressed concrete for shear in prestressed concrete in prestressed-concrete design?",
   "options": [
     "Shear reinforcement is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Shear-compression failure is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Prestress compression is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Stirrups is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Prestress compression is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-shear-004",
   "subject": "prestressedConcrete",
   "topic": "Shear in Prestressed Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes shear reinforcement in shear in prestressed concrete for shear in prestressed concrete in prestressed-concrete design?",
   "options": [
     "Shear-compression failure is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Stirrups is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Shear reinforcement is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Tendon curvature is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Shear reinforcement is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-shear-005",
   "subject": "prestressedConcrete",
   "topic": "Shear in Prestressed Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes shear-compression failure in shear in prestressed concrete for shear in prestressed concrete in prestressed-concrete design?",
   "options": [
     "Stirrups is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Tendon curvature is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Shear-compression failure is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Deviator force is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Shear-compression failure is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-shear-006",
   "subject": "prestressedConcrete",
   "topic": "Shear in Prestressed Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes stirrups in shear in prestressed concrete for shear in prestressed concrete in prestressed-concrete design?",
   "options": [
     "Tendon curvature is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Deviator force is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Stirrups is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Shear demand is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Stirrups is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-shear-007",
   "subject": "prestressedConcrete",
   "topic": "Shear in Prestressed Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes tendon curvature in shear in prestressed concrete for shear in prestressed concrete in prestressed-concrete design?",
   "options": [
     "Deviator force is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Shear demand is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Tendon curvature is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Principal tensile stress is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Tendon curvature is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-shear-008",
   "subject": "prestressedConcrete",
   "topic": "Shear in Prestressed Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes deviator force in shear in prestressed concrete for shear in prestressed concrete in prestressed-concrete design?",
   "options": [
     "Shear demand is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Deviator force is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Principal tensile stress is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Anchorage-zone shear is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Deviator force is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-shear-009",
   "subject": "prestressedConcrete",
   "topic": "Shear in Prestressed Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes shear demand in shear in prestressed concrete for shear in prestressed concrete in prestressed-concrete design?",
   "options": [
     "Principal tensile stress is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Anchorage-zone shear is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Shear-friction is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Shear demand is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Shear demand is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-shear-010",
   "subject": "prestressedConcrete",
   "topic": "Shear in Prestressed Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes principal tensile stress in shear in prestressed concrete for shear in prestressed concrete in prestressed-concrete design?",
   "options": [
     "Anchorage-zone shear is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Shear-friction is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Effective depth is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Principal tensile stress is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Principal tensile stress is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-shear-011",
   "subject": "prestressedConcrete",
   "topic": "Shear in Prestressed Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes anchorage-zone shear in shear in prestressed concrete for shear in prestressed concrete in prestressed-concrete design?",
   "options": [
     "Shear-friction is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Anchorage-zone shear is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Effective depth is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Shear crack pattern is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Anchorage-zone shear is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-shear-012",
   "subject": "prestressedConcrete",
   "topic": "Shear in Prestressed Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes shear-friction in shear in prestressed concrete for shear in prestressed concrete in prestressed-concrete design?",
   "options": [
     "Effective depth is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Shear crack pattern is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Transverse reinforcement is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Shear-friction is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Shear-friction is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-shear-013",
   "subject": "prestressedConcrete",
   "topic": "Shear in Prestressed Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes effective depth in shear in prestressed concrete for shear in prestressed concrete in prestressed-concrete design?",
   "options": [
     "Shear crack pattern is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Transverse reinforcement is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Effective depth is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Diagonal cracking is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Effective depth is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-shear-014",
   "subject": "prestressedConcrete",
   "topic": "Shear in Prestressed Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes shear crack pattern in shear in prestressed concrete for shear in prestressed concrete in prestressed-concrete design?",
   "options": [
     "Transverse reinforcement is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Diagonal cracking is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Web shear is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Shear crack pattern is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Shear crack pattern is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-shear-015",
   "subject": "prestressedConcrete",
   "topic": "Shear in Prestressed Concrete",
   "type": "mcq",
   "prompt": "Which statement best describes transverse reinforcement in shear in prestressed concrete for shear in prestressed concrete in prestressed-concrete design?",
   "options": [
     "Diagonal cracking is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Web shear is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Transverse reinforcement is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state",
     "Prestress compression is a relevant shear in prestressed concrete concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Transverse reinforcement is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-serviceability-001",
   "subject": "prestressedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes crack control in serviceability for serviceability in prestressed-concrete design?",
   "options": [
     "Decompression is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Camber is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Crack control is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Long-term camber is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Crack control is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-serviceability-002",
   "subject": "prestressedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes decompression in serviceability for serviceability in prestressed-concrete design?",
   "options": [
     "Camber is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Long-term camber is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Effective prestress is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Decompression is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Decompression is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-serviceability-003",
   "subject": "prestressedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes camber in serviceability for serviceability in prestressed-concrete design?",
   "options": [
     "Long-term camber is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Effective prestress is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Camber is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Service stress is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Camber is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-serviceability-004",
   "subject": "prestressedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes long-term camber in serviceability for serviceability in prestressed-concrete design?",
   "options": [
     "Long-term camber is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Effective prestress is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Service stress is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Deflection is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Long-term camber is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-serviceability-005",
   "subject": "prestressedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes effective prestress in serviceability for serviceability in prestressed-concrete design?",
   "options": [
     "Service stress is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Deflection is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Vibration is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Effective prestress is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Effective prestress is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-serviceability-006",
   "subject": "prestressedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes service stress in serviceability for serviceability in prestressed-concrete design?",
   "options": [
     "Service stress is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Deflection is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Vibration is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Prestress loss is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Service stress is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-serviceability-007",
   "subject": "prestressedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes deflection in serviceability for serviceability in prestressed-concrete design?",
   "options": [
     "Vibration is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Prestress loss is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Deflection is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Differential camber is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Deflection is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-serviceability-008",
   "subject": "prestressedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes vibration in serviceability for serviceability in prestressed-concrete design?",
   "options": [
     "Prestress loss is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Vibration is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Differential camber is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Crack width is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Vibration is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-serviceability-009",
   "subject": "prestressedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes prestress loss in serviceability for serviceability in prestressed-concrete design?",
   "options": [
     "Prestress loss is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Differential camber is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Crack width is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Sustained load is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Prestress loss is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-serviceability-010",
   "subject": "prestressedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes differential camber in serviceability for serviceability in prestressed-concrete design?",
   "options": [
     "Crack width is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Sustained load is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Differential camber is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Durability is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Differential camber is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-serviceability-011",
   "subject": "prestressedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes crack width in serviceability for serviceability in prestressed-concrete design?",
   "options": [
     "Sustained load is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Crack width is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Durability is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Fiber compression is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Crack width is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-serviceability-012",
   "subject": "prestressedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes sustained load in serviceability for serviceability in prestressed-concrete design?",
   "options": [
     "Durability is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Fiber compression is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Nonprestressed reinforcement is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Sustained load is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Sustained load is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-serviceability-013",
   "subject": "prestressedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes durability in serviceability for serviceability in prestressed-concrete design?",
   "options": [
     "Fiber compression is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Durability is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Nonprestressed reinforcement is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Deflection is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Durability is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-serviceability-014",
   "subject": "prestressedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes fiber compression in serviceability for serviceability in prestressed-concrete design?",
   "options": [
     "Fiber compression is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Nonprestressed reinforcement is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Deflection is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Story drift is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Fiber compression is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-serviceability-015",
   "subject": "prestressedConcrete",
   "topic": "Beams — Allowable Bending Stresses",
   "type": "mcq",
   "prompt": "Which statement best describes nonprestressed reinforcement in serviceability for serviceability in prestressed-concrete design?",
   "options": [
     "Deflection is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Nonprestressed reinforcement is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Story drift is a relevant serviceability concept that must be evaluated in its appropriate structural limit state",
     "Vibration is a relevant serviceability concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Nonprestressed reinforcement is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-detailing-001",
   "subject": "prestressedConcrete",
   "topic": "Detailing & Applications",
   "type": "mcq",
   "prompt": "Which statement best describes anchorage zone in detailing & applications for detailing & applications in prestressed-concrete design?",
   "options": [
     "Bursting reinforcement is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Anchorage zone is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Tendon profile is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Duct clearance is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Anchorage zone is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-detailing-002",
   "subject": "prestressedConcrete",
   "topic": "Detailing & Applications",
   "type": "mcq",
   "prompt": "Which statement best describes bursting reinforcement in detailing & applications for detailing & applications in prestressed-concrete design?",
   "options": [
     "Tendon profile is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Duct clearance is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Bursting reinforcement is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Deviator is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Bursting reinforcement is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-detailing-003",
   "subject": "prestressedConcrete",
   "topic": "Detailing & Applications",
   "type": "mcq",
   "prompt": "Which statement best describes tendon profile in detailing & applications for detailing & applications in prestressed-concrete design?",
   "options": [
     "Tendon profile is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Duct clearance is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Deviator is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Corrosion protection is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Tendon profile is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-detailing-004",
   "subject": "prestressedConcrete",
   "topic": "Detailing & Applications",
   "type": "mcq",
   "prompt": "Which statement best describes duct clearance in detailing & applications for detailing & applications in prestressed-concrete design?",
   "options": [
     "Deviator is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Duct clearance is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Corrosion protection is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Anchor force is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Duct clearance is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-detailing-005",
   "subject": "prestressedConcrete",
   "topic": "Detailing & Applications",
   "type": "mcq",
   "prompt": "Which statement best describes deviator in detailing & applications for detailing & applications in prestressed-concrete design?",
   "options": [
     "Corrosion protection is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Deviator is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Anchor force is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Precast bridge girder is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 1,
   "explanation": "Deviator is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-detailing-006",
   "subject": "prestressedConcrete",
   "topic": "Detailing & Applications",
   "type": "mcq",
   "prompt": "Which statement best describes corrosion protection in detailing & applications for detailing & applications in prestressed-concrete design?",
   "options": [
     "Corrosion protection is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Anchor force is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Precast bridge girder is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Post-tensioned floor is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Corrosion protection is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-detailing-007",
   "subject": "prestressedConcrete",
   "topic": "Detailing & Applications",
   "type": "mcq",
   "prompt": "Which statement best describes anchor force in detailing & applications for detailing & applications in prestressed-concrete design?",
   "options": [
     "Precast bridge girder is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Post-tensioned floor is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Anchor force is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Tendon spacing is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 2,
   "explanation": "Anchor force is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-detailing-008",
   "subject": "prestressedConcrete",
   "topic": "Detailing & Applications",
   "type": "mcq",
   "prompt": "Which statement best describes precast bridge girder in detailing & applications for detailing & applications in prestressed-concrete design?",
   "options": [
     "Post-tensioned floor is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Tendon spacing is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Grouting is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Precast bridge girder is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Precast bridge girder is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-detailing-009",
   "subject": "prestressedConcrete",
   "topic": "Detailing & Applications",
   "type": "mcq",
   "prompt": "Which statement best describes post-tensioned floor in detailing & applications for detailing & applications in prestressed-concrete design?",
   "options": [
     "Post-tensioned floor is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Tendon spacing is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Grouting is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Construction-stage stress is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Post-tensioned floor is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-detailing-010",
   "subject": "prestressedConcrete",
   "topic": "Detailing & Applications",
   "type": "mcq",
   "prompt": "Which statement best describes tendon spacing in detailing & applications for detailing & applications in prestressed-concrete design?",
   "options": [
     "Grouting is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Construction-stage stress is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Tendon slip is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Tendon spacing is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Tendon spacing is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-detailing-011",
   "subject": "prestressedConcrete",
   "topic": "Detailing & Applications",
   "type": "mcq",
   "prompt": "Which statement best describes grouting in detailing & applications for detailing & applications in prestressed-concrete design?",
   "options": [
     "Grouting is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Construction-stage stress is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Tendon slip is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "End-zone reinforcement is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Grouting is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-detailing-012",
   "subject": "prestressedConcrete",
   "topic": "Detailing & Applications",
   "type": "mcq",
   "prompt": "Which statement best describes construction-stage stress in detailing & applications for detailing & applications in prestressed-concrete design?",
   "options": [
     "Construction-stage stress is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Tendon slip is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "End-zone reinforcement is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Cover and reinforcement coordination is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Construction-stage stress is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-detailing-013",
   "subject": "prestressedConcrete",
   "topic": "Detailing & Applications",
   "type": "mcq",
   "prompt": "Which statement best describes tendon slip in detailing & applications for detailing & applications in prestressed-concrete design?",
   "options": [
     "Tendon slip is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "End-zone reinforcement is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Cover and reinforcement coordination is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Anchorage zone is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "Tendon slip is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-detailing-014",
   "subject": "prestressedConcrete",
   "topic": "Detailing & Applications",
   "type": "mcq",
   "prompt": "Which statement best describes end-zone reinforcement in detailing & applications for detailing & applications in prestressed-concrete design?",
   "options": [
     "End-zone reinforcement is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Cover and reinforcement coordination is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Anchorage zone is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Bursting reinforcement is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 0,
   "explanation": "End-zone reinforcement is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "prestressed-detailing-015",
   "subject": "prestressedConcrete",
   "topic": "Detailing & Applications",
   "type": "mcq",
   "prompt": "Which statement best describes cover and reinforcement coordination in detailing & applications for detailing & applications in prestressed-concrete design?",
   "options": [
     "Anchorage zone is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Bursting reinforcement is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Tendon profile is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state",
     "Cover and reinforcement coordination is a relevant detailing & applications concept that must be evaluated in its appropriate structural limit state"
   ],
   "correct": 3,
   "explanation": "Cover and reinforcement coordination is evaluated because it affects the stated structural behavior or design limit state."
 },
 {
   "id": "steel-web-bearing-001",
   "subject": "steel",
   "topic": "Web Yielding, Web Crippling & Beam Bearing Plates",
   "type": "mcq",
   "prompt": "What is local web yielding in a steel beam?",
   "options": [
     "Buckling of the web caused by a compressive force delivered through the flange",
     "Yielding of the web under a concentrated load applied normal to a flange",
     "Lateral-torsional buckling of the compression flange",
     "Rupture of the beam flange at a bolt hole"
   ],
   "correct": 1,
   "explanation": "The supplied Steel Design material describes local web yielding as occurring when a concentrated load is applied normal to one flange and symmetric to the web."
 },
 {
   "id": "steel-web-bearing-002",
   "subject": "steel",
   "topic": "Web Yielding, Web Crippling & Beam Bearing Plates",
   "type": "mcq",
   "prompt": "What is web crippling?",
   "options": [
     "Buckling of the web caused by a compressive force delivered through the flange",
     "Yielding of the gross tension area",
     "Plastic hinging at midspan",
     "Shear lag in an angle connection"
   ],
   "correct": 0,
   "explanation": "The source defines web crippling as buckling of the web caused by compressive force delivered through the flange."
 },
 {
   "id": "steel-web-bearing-003",
   "subject": "steel",
   "topic": "Web Yielding, Web Crippling & Beam Bearing Plates",
   "type": "mcq",
   "prompt": "Which sequence matches the three basic steps in beam bearing-plate design?",
   "options": [
     "Select weld size, calculate bolt shear, check block shear",
     "Determine bearing length, determine plate width for supporting-material bearing, determine plate thickness for bending",
     "Determine plastic moment, calculate Euler load, determine weld throat",
     "Calculate net area, effective length, and lateral-torsional buckling"
   ],
   "correct": 1,
   "explanation": "The supplied material lists bearing length, bearing area, and plate thickness as the three design steps."
 },
 {
   "id": "steel-biaxial-001",
   "subject": "steel",
   "topic": "Biaxial Bending & Purlins",
   "type": "mcq",
   "prompt": "What does biaxial bending mean?",
   "options": [
     "Bending about both principal axes",
     "Axial compression without bending",
     "Shear acting only in the web",
     "Torsion in a weld group"
   ],
   "correct": 0,
   "explanation": "The syllabus identifies biaxial bending as beams bending about both axes."
 },
 {
   "id": "steel-biaxial-002",
   "subject": "steel",
   "topic": "Biaxial Bending & Purlins",
   "type": "mcq",
   "prompt": "How are purlins described in the supplied Steel Design material?",
   "options": [
     "Roof beams supported by roof trusses",
     "Vertical columns supporting foundations",
     "Wall anchors connected only by welds",
     "Concrete beams supporting steel columns"
   ],
   "correct": 0,
   "explanation": "The PDF identifies a purlin as a roof beam supported by roof trusses."
 },
 {
   "id": "steel-compression-001",
   "subject": "steel",
   "topic": "Axially Loaded Compression Members",
   "type": "mcq",
   "prompt": "What is effective length in column design?",
   "options": [
     "The column length associated with buckling, which depends on support conditions",
     "The gross width of the column flange",
     "The length of a weld throat",
     "The distance between bolt holes"
   ],
   "correct": 0,
   "explanation": "The source explains that effective length is associated with buckling and varies with column end conditions."
 },
 {
   "id": "steel-compression-002",
   "subject": "steel",
   "topic": "Axially Loaded Compression Members",
   "type": "mcq",
   "prompt": "Which is NOT listed as an overall buckling mode for an axially loaded compression member?",
   "options": [
     "Flexural buckling",
     "Torsional buckling",
     "Flexural-torsional buckling",
     "Bearing failure of a concrete footing"
   ],
   "correct": 3,
   "explanation": "The source lists flexural, torsional, and flexural-torsional buckling as overall instability modes."
 },
 {
   "id": "steel-weld-001",
   "subject": "steel",
   "topic": "Welded Connections",
   "type": "mcq",
   "prompt": "What failure mode is assumed for a fillet weld in the supplied material?",
   "options": [
     "Shear through the throat of the weld",
     "Flexural yielding of the flange",
     "Tension through the weld toe only",
     "Buckling of the base plate"
   ],
   "correct": 0,
   "explanation": "The source assumes a fillet weld is weakest in shear and fails on a plane through its throat."
 },
 {
   "id": "steel-bolted-001",
   "subject": "steel",
   "topic": "Bolted/Riveted Connections",
   "type": "mcq",
   "prompt": "Which failure mode is specifically identified for the connected parts of a bolted connection?",
   "options": [
     "Bearing exerted by the fasteners",
     "Only concrete crushing",
     "Only weld throat rupture",
     "Prestress loss"
   ],
   "correct": 0,
   "explanation": "The supplied material identifies bearing failure of the connected part as a possible connection failure mode."
 }

];


/* =========================================================
  QUIZ STATE
========================================================= */

let quizState = {

 questions: [],

 current: 0,

 answers: {},

 title: "",

 subject: "",

 duration: 600,

 secondsRemaining: 600,

 timer: null

};


/* =========================================================
  QUIZ HELPERS
========================================================= */

function updateQuizTopics() {

 const subject =
   document.getElementById(
     "quizSubject"
   ).value;


 const select =
   document.getElementById(
     "quizTopic"
   );


 const topics =
   subjectTopics[subject] || [];


 select.innerHTML =
   topics.map(
     topic =>
       `<option value="${escapeAttribute(topic.name)}">
         ${escapeHTML(topic.name)}
       </option>`
   ).join("");

}


function getQuestionsForSubject(
 subject
) {

 return questionBank.filter(
   question =>
     question.subject === subject
 );

}


function shuffle(
 array
) {

 return [...array]
   .sort(
     () =>
       Math.random() - 0.5
   );

}


function startTopicQuiz() {

 const subject =
   document.getElementById(
     "quizSubject"
   ).value;


 const topic =
   document.getElementById(
     "quizTopic"
   ).value;


 let questions =
   questionBank.filter(
     question =>
       question.subject === subject &&
       question.topic === topic
   );


 if (!questions.length) {

   alert(
     "There aren't enough questions for this topic yet."
   );

   return;

 }


 questions =
   shuffle(
     questions
   );


 startQuizFromQuestions(
   questions,
   {
     id:
       `topic-${Date.now()}`,

     title:
       `${topic} Quiz`,

     subject,

     duration:
       Math.max(
         180,
         questions.length * 60
       )
   }
 );

}


function startQuickQuiz() {

 const questions =
   shuffle(
     questionBank
   )
   .slice(
     0,
     Math.min(
       10,
       questionBank.length
     )
   );


 startQuizFromQuestions(
   questions,
   {
     id:
       `quick-${Date.now()}`,

     title:
       "Quick Engineering Practice",

     subject:
       "mixed",

     duration:
       600
   }
 );

}


function startQuizFromQuestions(
 questions,
 options = {}
) {

 if (!questions.length) {

   alert(
     "No questions are available."
   );

   return;

 }


 quizState = {

   questions:
     shuffle(questions),

   current:
     0,

   answers:
     {},

   title:
     options.title ||
     "Engineering Quiz",

   subject:
     options.subject ||
     "mixed",

   duration:
     options.duration ||
     600,

   secondsRemaining:
     options.duration ||
     600,

   timer:
     null

 };


 clearInterval(
   quizState.timer
 );


 showPage(
   "quizActivePage"
 );


 renderQuizQuestion();


 quizState.timer =
   setInterval(
     updateQuizTimer,
     1000
   );

}


function updateQuizTimer() {

 quizState.secondsRemaining--;


 updateTimerDisplay(
   "quizTimer",
   quizState.secondsRemaining
 );


 if (
   quizState.secondsRemaining <= 0
 ) {

   clearInterval(
     quizState.timer
   );

   alert(
     "Time is up! Your quiz will be submitted."
   );

   finishQuiz();

 }

}


function updateTimerDisplay(
 elementId,
 seconds
) {

 const element =
   document.getElementById(
     elementId
   );


 if (!element) {

   return;

 }


 const mins =
   Math.floor(
     seconds / 60
   );


 const secs =
   seconds % 60;


 element.textContent =
   `${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;

}


function renderQuizQuestion() {

 const question =
   quizState.questions[
     quizState.current
   ];


 if (!question) {

   return;

 }


 const total =
   quizState.questions.length;


 document.getElementById(
   "activeQuizTitle"
 ).textContent =
   quizState.title;


 document.getElementById(
   "quizProgressText"
 ).textContent =
   `Question ${quizState.current + 1} of ${total}`;


 document.getElementById(
   "quizProgressBar"
 ).style.width =
   `${((quizState.current + 1) / total) * 100}%`;


 document.getElementById(
   "quizQuestion"
 ).textContent =
   question.prompt;


 document.getElementById(
   "quizQuestionType"
 ).textContent =
   question.type.toUpperCase();


 document.getElementById(
   "quizQuestionTopic"
 ).textContent =
   question.topic;


 const optionsContainer =
   document.getElementById(
     "quizOptions"
   );


 const numeric =
   document.getElementById(
     "quizNumericInput"
   );


 const identification =
   document.getElementById(
     "quizIdentificationInput"
   );


 optionsContainer.innerHTML =
   "";


 numeric.classList.add(
   "hidden"
 );


 identification.classList.add(
   "hidden"
 );


 if (
   question.type === "mcq"
 ) {

   question.options.forEach(
     (
       option,
       index
     ) => {

       const button =
         document.createElement(
           "button"
         );


       button.className =
         "quiz-option";


       if (
         quizState.answers[
           question.id
         ] === index
       ) {

         button.classList.add(
           "selected"
         );

       }


       button.innerHTML = `

         <span class="quiz-option-letter">
           ${String.fromCharCode(65 + index)}
         </span>

         <span>
           ${escapeHTML(option)}
         </span>

       `;


       button.onclick =
         () =>
           selectQuizAnswer(
             question.id,
             index
           );


       optionsContainer.appendChild(
         button
       );

     }
   );

 }


 else if (
   question.type === "numeric"
 ) {

   numeric.classList.remove(
     "hidden"
   );


   document.getElementById(
     "numericAnswer"
   ).value =
     quizState.answers[
       question.id
     ] ?? "";

 }


 else {

   identification.classList.remove(
     "hidden"
   );


   document.getElementById(
     "identificationAnswer"
   ).value =
     quizState.answers[
       question.id
     ] ?? "";

 }


 document.getElementById(
   "quizPreviousBtn"
 ).disabled =
   quizState.current === 0;


 document.getElementById(
   "quizNextBtn"
 ).textContent =
   quizState.current === total - 1
     ? "Submit Quiz ✓"
     : "Next →";


 updateTimerDisplay(
   "quizTimer",
   quizState.secondsRemaining
 );

}


function selectQuizAnswer(
 questionId,
 answer
) {

 quizState.answers[
   questionId
 ] = answer;


 renderQuizQuestion();

}


function saveCurrentTextAnswer() {

 const question =
   quizState.questions[
     quizState.current
   ];


 if (!question) {

   return;

 }


 if (
   question.type === "numeric"
 ) {

   const input =
     document.getElementById(
       "numericAnswer"
     );


   if (input) {

     quizState.answers[
       question.id
     ] =
       input.value;

   }

 }


 if (
   question.type === "identification"
 ) {

   const input =
     document.getElementById(
       "identificationAnswer"
     );


   if (input) {

     quizState.answers[
       question.id
     ] =
       input.value;

   }

 }

}


function nextQuizQuestion() {

 saveCurrentTextAnswer();


 if (
   quizState.current >=
   quizState.questions.length - 1
 ) {

   finishQuiz();

   return;

 }


 quizState.current++;

 renderQuizQuestion();

}


function previousQuizQuestion() {

 saveCurrentTextAnswer();


 if (
   quizState.current <= 0
 ) {

   return;

 }


 quizState.current--;

 renderQuizQuestion();

}


/* =========================================================
  QUIZ GRADING
========================================================= */

function normalizeAnswer(
 answer
) {

 return String(
   answer ?? ""
 )
   .trim()
   .toLowerCase()
   .replace(
     /\s+/g,
     " "
   );

}


function gradeQuestion(
 question,
 userAnswer
) {

 if (
   question.type === "mcq"
 ) {

   return (
     Number(userAnswer) ===
     Number(question.correct)
   );

 }


 if (
   question.type === "identification"
 ) {

   const user =
     normalizeAnswer(
       userAnswer
     );


   return question.accepted
     ?.some(
       answer =>
         normalizeAnswer(
           answer
         ) === user
     ) || false;

 }


 if (
   question.type === "numeric"
 ) {

   const user =
     Number(userAnswer);


   const correct =
     Number(question.correct);


   if (
     !Number.isFinite(user)
   ) {

     return false;

   }


   const tolerance =
     question.tolerance ??
     Math.max(
       Math.abs(correct) * 0.01,
       0.01
     );


   return (
     Math.abs(
       user - correct
     ) <= tolerance
   );

 }


 return false;

}


function formatAnswer(
 question,
 answer
) {

 if (
   answer === undefined ||
   answer === null ||
   answer === ""
 ) {

   return "No answer";

 }


 if (
   question.type === "mcq"
 ) {

   return (
     question.options[
       Number(answer)
     ] ??
     "No answer"
   );

 }


 return String(
   answer
 );

}


function finishQuiz() {

 saveCurrentTextAnswer();


 clearInterval(
   quizState.timer
 );


 let correctCount =
   0;


 const results =
   quizState.questions.map(
     question => {

       const userAnswer =
         quizState.answers[
           question.id
         ];


       const correct =
         gradeQuestion(
           question,
           userAnswer
         );


       if (correct) {

         correctCount++;

       }


       const result = {

         questionId:
           question.id,

         prompt:
           question.prompt,

         userAnswer,

         correctAnswer:
           formatAnswer(
             question,
             question.correct
           ),

         correct,

         explanation:
           question.explanation,

         subject:
           question.subject,

         topic:
           question.topic,

         type:
           question.type

       };


       if (!correct) {

         saveMistake(
           result
         );

       }


       updateTopicPerformance(
         question,
         correct
       );


       return result;

     }
   );


 const total =
   quizState.questions.length;


 const score =
   total
     ? (
         correctCount /
         total
       ) * 100
     : 0;


 data.quizScores.unshift({

   quizId:
     `quiz-${Date.now()}`,

   title:
     quizState.title,

   score,

   correct:
     correctCount,

   total,

   date:
     new Date().toISOString(),

   durationSeconds:
     quizState.duration -
     quizState.secondsRemaining,

   subject:
     quizState.subject,

   results

 });


 data.quizScores =
   data.quizScores.slice(
     0,
     100
   );


 data.questionsAnswered +=
   total;


 data.studyHistory.unshift({

   type:
     "quiz",

   title:
     quizState.title,

   date:
     new Date().toISOString(),

   score

 });


 data.studyHistory =
   data.studyHistory.slice(
     0,
     100
   );


 saveData();


 renderQuizResults(
   score,
   correctCount,
   total,
   results
 );


 showPage(
   "quizResultsPage"
 );

}


function saveMistake(
 result
) {

 const exists =
   data.mistakes.some(
     mistake =>
       mistake.questionId ===
       result.questionId
   );


 if (!exists) {

   data.mistakes.unshift(
     result
   );

 }


 data.mistakes =
   data.mistakes.slice(
     0,
     100
   );

}


function updateTopicPerformance(
 question,
 correct
) {

 const subject =
   question.subject;


 const topic =
   question.topic;


 if (
   !data.progress[subject]
 ) {

   data.progress[subject] =
     {};

 }


 if (
   !data.progress[subject][topic]
 ) {

   data.progress[subject][topic] = {

     reviewed: false,

     lastReviewed: null,

     quizAttempts: 0,

     correct: 0,

     questions: 0,

     accuracy: 0

   };

 }


 const item =
   data.progress[subject][topic];


 item.quizAttempts++;

 item.questions++;

 if (correct) {

   item.correct++;

 }


 item.accuracy =
   (
     item.correct /
     item.questions
   ) * 100;


 item.lastQuiz =
   new Date().toISOString();

}


function renderQuizResults(
 score,
 correct,
 total,
 results
) {

 document.getElementById(
   "quizScoreDisplay"
 ).textContent =
   `${score.toFixed(1)}%`;


 document.getElementById(
   "quizScoreSummary"
 ).textContent =
   `${correct} out of ${total} correct`;


 const container =
   document.getElementById(
     "quizResultsList"
   );


 container.innerHTML =
   results.map(
     (
       result,
       index
     ) => `

       <div
         class="result-item ${result.correct ? "correct" : "incorrect"}"
       >

         <div class="result-status">

           ${result.correct
             ? "✓ CORRECT"
             : "✕ NEEDS REVIEW"}

         </div>

         <h3>
           ${index + 1}.
           ${escapeHTML(result.prompt)}
         </h3>

         <p>
           <strong>Your answer:</strong>
           ${escapeHTML(
             formatAnswerForDisplay(
               result.userAnswer
             )
           )}
         </p>

         ${
           !result.correct
             ? `
               <p>
                 <strong>Correct answer:</strong>
                 ${escapeHTML(
                   result.correctAnswer
                 )}
               </p>
             `
             : ""
         }

         <p class="result-explanation">
           💡 ${escapeHTML(
             result.explanation
           )}
         </p>

       </div>

     `
   ).join("");

}


function formatAnswerForDisplay(
 answer
) {

 if (
   answer === undefined ||
   answer === null ||
   answer === ""
 ) {

   return "No answer";

 }


 return String(
   answer
 );

}


/* =========================================================
  PERFORMANCE
========================================================= */

function getTopicPerformance() {

 const performance = {};


 Object.entries(
   data.progress || {}
 ).forEach(
   (
     [
       subject,
       topics
     ]
   ) => {

     Object.entries(
       topics || {}
     ).forEach(
       (
         [
           topic,
           item
         ]
       ) => {

         performance[
           `${subject}::${topic}`
         ] = {

           subject,

           topic,

           questions:
             item.questions || 0,

           correct:
             item.correct || 0,

           accuracy:
             item.questions
               ? item.accuracy || 0
               : 0,

           mistakes:
             data.mistakes.filter(
               mistake =>
                 mistake.subject ===
                   subject &&
                 mistake.topic ===
                   topic
             ).length

         };

       }
     );

   }
 );


 return performance;

}


function getOverallPerformance() {

 const scores =
   data.quizScores
     .map(
       quiz =>
         Number(
           quiz.score
         )
     )
     .filter(
       Number.isFinite
     );


 const totalQuestions =
   data.quizScores.reduce(
     (
       sum,
       quiz
     ) =>
       sum +
       Number(
         quiz.total || 0
       ),
     0
   );


 const totalCorrect =
   data.quizScores.reduce(
     (
       sum,
       quiz
     ) =>
       sum +
       Number(
         quiz.correct || 0
       ),
     0
   );


 return {

   quizAttempts:
     data.quizScores.length,

   averageScore:
     scores.length
       ? scores.reduce(
           (
             sum,
             score
           ) =>
             sum + score,
           0
         ) / scores.length
       : null,

   questionsAnswered:
     totalQuestions,

   correctAnswers:
     totalCorrect,

   topicsReviewed:
     data.completedTopics.length,

   mistakes:
     data.mistakes.length

 };

}


function getSubjectPerformance() {

 const result = {};


 [
   "steel",
   "reinforcedConcrete",
   "prestressedConcrete"
 ].forEach(
   subject => {

     const topics =
       Object.values(
         data.progress[
           subject
         ] || {}
       );


     const questions =
       topics.reduce(
         (
           sum,
           item
         ) =>
           sum +
           (
             item.questions ||
             0
           ),
         0
       );


     const correct =
       topics.reduce(
         (
           sum,
           item
         ) =>
           sum +
           (
             item.correct ||
             0
           ),
         0
       );


     result[subject] = {

       questions,

       correct,

       accuracy:
         questions
           ? (
               correct /
               questions
             ) * 100
           : null

     };

   }
 );


 return result;

}


/* =========================================================
  ENGINEERING DASHBOARD
========================================================= */

function renderEngineeringDashboard() {

 const attempts =
   data.quizScores.length;


 const scores =
   data.quizScores
     .map(
       item =>
         Number(
           item.score
         )
     )
     .filter(
       Number.isFinite
     );


 const average =
   scores.length
     ? scores.reduce(
         (
           sum,
           score
         ) =>
           sum + score,
         0
       ) / scores.length
     : null;


 document.getElementById(
   "homeQuizAttempts"
 ).textContent =
   attempts;


 document.getElementById(
   "homeAccuracy"
 ).textContent =
   average === null
     ? "—"
     : `${average.toFixed(1)}%`;


 document.getElementById(
   "homeProblemsSolved"
 ).textContent =
   data.solverHistory.length;


 document.getElementById(
   "homeTutorSessions"
 ).textContent =
   data.tutorHistory.length;

}


/* =========================================================
  COACH
========================================================= */

function runCoachAnalysis() {

 renderCoachOverview();

 renderSubjectAnalysis();

 renderWeakTopics();

 renderStrongTopics();

 renderCoachRecommendation();

 renderStudyPlan();

}


function renderCoachOverview() {

 const container =
   document.getElementById(
     "coachOverview"
   );


 if (!container) {

   return;

 }


 const performance =
   getOverallPerformance();


 const average =
   performance.averageScore;


 container.innerHTML = `

   <div class="coach-card">

     <span class="eyebrow">
       OVERVIEW
     </span>

     <h2>
       Your Engineering Performance
     </h2>

     <div class="coach-stat-grid">

       <div class="coach-stat">
         <span>QUIZ ATTEMPTS</span>
         <strong>
           ${performance.quizAttempts}
         </strong>
       </div>

       <div class="coach-stat">
         <span>AVERAGE ACCURACY</span>
         <strong>
           ${
             average === null
               ? "—"
               : `${average.toFixed(1)}%`
           }
         </strong>
       </div>

       <div class="coach-stat">
         <span>TOPICS REVIEWED</span>
         <strong>
           ${performance.topicsReviewed}
         </strong>
       </div>

       <div class="coach-stat">
         <span>MISTAKES TRACKED</span>
         <strong>
           ${performance.mistakes}
         </strong>
       </div>

     </div>

   </div>

 `;

}


function renderSubjectAnalysis() {

 const container =
   document.getElementById(
     "subjectAnalysis"
   );


 if (!container) {

   return;

 }


 const subjects =
   getSubjectPerformance();


 container.innerHTML = `

   <div class="coach-card">

     <span class="eyebrow">
       SUBJECT BREAKDOWN
     </span>

     <h2>
       How You're Doing by Subject
     </h2>

     <div class="study-plan-list">

       ${Object.entries(
         subjects
       ).map(
         (
           [
             subject,
             item
           ]
         ) => `

           <div class="topic-performance-item">

             <div class="topic-performance-top">

               <strong>
                 ${formatSubjectName(subject)}
               </strong>

               <span>
                 ${
                   item.accuracy === null
                     ? "No data"
                     : `${item.accuracy.toFixed(1)}%`
                 }
               </span>

             </div>

             <div class="performance-bar">

               <div
                 class="performance-fill"
                 style="width:${Math.min(
                   item.accuracy || 0,
                   100
                 )}%"
               ></div>

             </div>

           </div>

         `
       ).join("")}

     </div>

   </div>

 `;

}


function renderWeakTopics() {

 const container =
   document.getElementById(
     "weakTopics"
   );


 if (!container) {

   return;

 }


 const topics =
   Object.values(
     getTopicPerformance()
   )
   .filter(
     topic =>
       topic.questions > 0
   )
   .sort(
     (
       a,
       b
     ) =>
       a.accuracy -
       b.accuracy
   )
   .slice(
     0,
     5
   );


 container.innerHTML = `

   <div class="coach-card">

     <span class="eyebrow">
       FOCUS AREAS
     </span>

     <h2>
       Topics to Review
     </h2>

     ${
       topics.length
         ? topics.map(
             topic =>
               topicPerformanceHTML(
                 topic
               )
           ).join("")
         : `
           <p>
             Take a few quizzes first and
             I'll identify your weak areas.
           </p>
         `
     }

   </div>

 `;

}


function renderStrongTopics() {

 const container =
   document.getElementById(
     "strongTopics"
   );


 if (!container) {

   return;

 }


 const topics =
   Object.values(
     getTopicPerformance()
   )
   .filter(
     topic =>
       topic.questions > 0
   )
   .sort(
     (
       a,
       b
     ) =>
       b.accuracy -
       a.accuracy
   )
   .slice(
     0,
     5
   );


 container.innerHTML = `

   <div class="coach-card">

     <span class="eyebrow">
       STRENGTHS
     </span>

     <h2>
       Your Strong Topics
     </h2>

     ${
       topics.length
         ? topics.map(
             topic =>
               topicPerformanceHTML(
                 topic
               )
           ).join("")
         : `
           <p>
             Your strong areas will appear here
             as you complete quizzes.
           </p>
         `
     }

   </div>

 `;

}


function topicPerformanceHTML(
 topic
) {

 return `

   <div class="topic-performance-item">

     <div class="topic-performance-top">

       <strong>
         ${escapeHTML(topic.topic)}
       </strong>

       <span>
         ${topic.accuracy.toFixed(1)}%
       </span>

     </div>

     <div class="performance-bar">

       <div
         class="performance-fill"
         style="width:${Math.min(
           topic.accuracy,
           100
         )}%"
       ></div>

     </div>

     <small>
       ${topic.questions} question(s)
       · ${topic.mistakes} mistake(s)
     </small>

   </div>

 `;

}


function renderCoachRecommendation() {

 const container =
   document.getElementById(
     "coachRecommendation"
   );


 if (!container) {

   return;

 }


 const weak =
   Object.values(
     getTopicPerformance()
   )
   .filter(
     topic =>
       topic.questions > 0
   )
   .sort(
     (
       a,
       b
     ) =>
       a.accuracy -
       b.accuracy
   )[0];


 let message;


 if (!weak) {

   message =
     "Start with a topic quiz. Once you have performance data, your coach will create personalized recommendations.";

 }

 else if (
   weak.accuracy < 60
 ) {

   message =
     `Spend focused review time on ${weak.topic}. Your current recorded accuracy is ${weak.accuracy.toFixed(1)}%. Review the concept first, then use Smart Practice to reinforce it.`;

 }

 else if (
   weak.accuracy < 80
 ) {

   message =
     `${weak.topic} is currently your biggest opportunity for improvement. Review the topic and aim for consistent practice above your current accuracy.`;

 }

 else {

   message =
     "Your recorded performance is looking solid. Continue rotating topics and use mixed practice to maintain your understanding.";

 }


 container.innerHTML = `

   <div class="recommendation-card">

     <span class="eyebrow">
       COACH RECOMMENDATION
     </span>

     <h2>
       Your Next Move
     </h2>

     <p>
       ${escapeHTML(message)}
     </p>

   </div>

 `;

}


function renderStudyPlan() {

 const container =
   document.getElementById(
     "studyPlan"
   );


 if (!container) {

   return;

 }


 const weakTopics =
   Object.values(
     getTopicPerformance()
   )
   .filter(
     topic =>
       topic.questions > 0
   )
   .sort(
     (
       a,
       b
     ) =>
       a.accuracy -
       b.accuracy
   )
   .slice(
     0,
     3
   );


 const plan =
   weakTopics.length
     ? weakTopics.map(
         (
           topic,
           index
         ) => ({

           number:
             index + 1,

           title:
             topic.topic,

           text:
             topic.accuracy < 60
               ? "Review the fundamentals, then solve targeted practice questions."
               : "Review your mistakes and complete additional practice problems."

         })
       )
     : [

         {
           number: 1,
           title:
             "Take a Topic Quiz",
           text:
             "Start building performance data so your coach can personalize your study plan."
         },

         {
           number: 2,
           title:
             "Review the Fundamentals",
           text:
             "Focus on physical behavior before memorizing formulas."
         },

         {
           number: 3,
           title:
             "Practice",
           text:
             "Use Smart Practice after you have enough quiz history."
         }

       ];


 container.innerHTML = `

   <div class="coach-card">

     <span class="eyebrow">
       STUDY PLAN
     </span>

     <h2>
       Suggested Next Steps
     </h2>

     <div class="study-plan-list">

       ${plan.map(
         item => `

           <div class="study-plan-item">

             <div class="study-plan-number">
               ${item.number}
             </div>

             <div>

               <strong>
                 ${escapeHTML(item.title)}
               </strong>

               <p>
                 ${escapeHTML(item.text)}
               </p>

             </div>

           </div>

         `
       ).join("")}

     </div>

   </div>

 `;

}


function resetPerformanceData() {

 const confirmed =
   confirm(
     "Reset quiz scores, mistakes, exam history, progress, and study history?"
   );


 if (!confirmed) {

   return;

 }


 data.quizScores = [];

 data.examHistory = [];

 data.questionsAnswered = 0;

 data.completedTopics = [];

 data.mistakes = [];

 data.progress = {

   steel: {},

   reinforcedConcrete: {},

   prestressedConcrete: {}

 };

 data.studyHistory = [];

 data.solverHistory = [];

 data.tutorHistory = [];


 saveData();


 runCoachAnalysis();

 renderEngineeringDashboard();

}


/* =========================================================
  SMART PRACTICE
========================================================= */

function getAdaptiveTopics() {

 const performance =
   getTopicPerformance();


 const allTopics = [];


 Object.entries(
   subjectTopics
 ).forEach(
   (
     [
       subject,
       topics
     ]
   ) => {

     topics.forEach(
       topic => {

         const key =
           `${subject}::${topic.name}`;


         const existing =
           performance[key] || {

             subject,

             topic:
               topic.name,

             questions:
               0,

             correct:
               0,

             accuracy:
               0,

             mistakes:
               0

           };


         let priority =
           0;


         if (
           existing.questions > 0
         ) {

           priority +=
             100 -
             existing.accuracy;

         }

         else {

           priority +=
             35;

         }


         priority +=
           existing.mistakes *
           12;


         allTopics.push({

           ...existing,

           priority

         });

       }
     );

   }
 );


 return allTopics
   .sort(
     (
       a,
       b
     ) =>
       b.priority -
       a.priority
   )
   .slice(
     0,
     5
   );

}


function renderAdaptivePage() {

 const topics =
   getAdaptiveTopics();


 const count =
   document.getElementById(
     "adaptiveTopicCount"
   );


 if (count) {

   count.textContent =
     topics.length;

 }


 const container =
   document.getElementById(
     "adaptivePriorityTopics"
   );


 if (!container) {

   return;

 }


 container.innerHTML =
   topics.map(
     topic => `

       <div class="priority-topic">

         <div>

           <strong>
             ${escapeHTML(topic.topic)}
           </strong>

           <small>
             ${formatSubjectName(topic.subject)}
             ·
             ${
               topic.questions
                 ? `${topic.accuracy.toFixed(1)}% accuracy`
                 : "Not practiced yet"
             }
           </small>

         </div>

         <span class="priority-score">
           Priority ${Math.round(topic.priority)}
         </span>

       </div>

     `
   ).join("");

}


function startAdaptivePractice() {

 const topics =
   getAdaptiveTopics();


 if (!topics.length) {

   alert(
     "Take at least one quiz first so Smart Practice can identify your priority topics."
   );

   return;

 }


 const selectedTopics =
   topics
     .slice(
       0,
       3
     )
     .map(
       topic =>
         `${topic.subject}::${topic.topic}`
     );


 let questions =
   questionBank.filter(
     question =>
       selectedTopics.includes(
         `${question.subject}::${question.topic}`
       )
   );


 if (!questions.length) {

   alert(
     "There aren't enough questions for these priority topics yet."
   );

   return;

 }


 questions =
   shuffle(
     questions
   ).slice(
     0,
     10
   );


 startQuizFromQuestions(
   questions,
   {

     id:
       "adaptive-practice",

     title:
       "Smart Practice",

     subject:
       "adaptive",

     duration:
       600

   }
 );

}


/* =========================================================
  EXAM MODE
========================================================= */

let examState = {

 questions: [],

 current: 0,

 answers: {},

 flagged: {},

 secondsRemaining:
   1800,

 timer: null

};


function startEngineeringExam() {

 const questions =
   shuffle(
     questionBank
   ).slice(
     0,
     Math.min(
       50,
       questionBank.length
     )
   );


 if (!questions.length) {

   alert(
     "There aren't enough questions for an examination yet."
   );

   return;

 }


 examState = {

   questions,

   current:
     0,

   answers: {},

   flagged: {},

   secondsRemaining:
     1800,

   timer:
     null

 };


 showPage(
   "examActivePage"
 );


 renderExamQuestion();

 renderExamAnswerSheet();


 clearInterval(
   examState.timer
 );


 examState.timer =
   setInterval(
     updateExamTimer,
     1000
   );

}


function updateExamTimer() {

 examState.secondsRemaining--;


 updateTimerDisplay(
   "examTimer",
   examState.secondsRemaining
 );


 if (
   examState.secondsRemaining <= 0
 ) {

   clearInterval(
     examState.timer
   );

   alert(
     "Time is up! Your examination will be submitted."
   );

   submitExam();

 }

}


function renderExamQuestion() {

 const question =
   examState.questions[
     examState.current
   ];


 if (!question) {

   return;

 }


 document.getElementById(
   "examQuestionNumber"
 ).textContent =
   `Question ${examState.current + 1} of ${examState.questions.length}`;


 document.getElementById(
   "examQuestion"
 ).textContent =
   question.prompt;


 document.getElementById(
   "examQuestionType"
 ).textContent =
   question.type.toUpperCase();


 document.getElementById(
   "examQuestionTopic"
 ).textContent =
   question.topic;


 const container =
   document.getElementById(
     "examOptions"
   );


 container.innerHTML =
   "";


 if (
   question.type === "mcq"
 ) {

   question.options.forEach(
     (
       option,
       index
     ) => {

       const button =
         document.createElement(
           "button"
         );


       button.className =
         "quiz-option";


       if (
         examState.answers[
           question.id
         ] === index
       ) {

         button.classList.add(
           "selected"
         );

       }


       button.innerHTML = `

         <span class="quiz-option-letter">
           ${String.fromCharCode(65 + index)}
         </span>

         <span>
           ${escapeHTML(option)}
         </span>

       `;


       button.onclick =
         () => {

           examState.answers[
             question.id
           ] = index;

           renderExamQuestion();

           renderExamAnswerSheet();

         };


       container.appendChild(
         button
       );

     }
   );

 }


 updateTimerDisplay(
   "examTimer",
   examState.secondsRemaining
 );


 const flagButton =
   document.getElementById(
     "examFlagBtn"
   );


 if (flagButton) {

   flagButton.textContent =
     examState.flagged[
       question.id
     ]
       ? "🚩 Unflag"
       : "🚩 Flag";

 }

}


function previousExamQuestion() {

 if (
   examState.current <= 0
 ) {

   return;

 }


 examState.current--;

 renderExamQuestion();

 renderExamAnswerSheet();

}


function nextExamQuestion() {

 if (
   examState.current >=
   examState.questions.length - 1
 ) {

   return;

 }


 examState.current++;

 renderExamQuestion();

 renderExamAnswerSheet();

}


function toggleExamFlag() {

 const question =
   examState.questions[
     examState.current
   ];


 if (!question) {

   return;

 }


 examState.flagged[
   question.id
 ] =
   !examState.flagged[
     question.id
   ];


 renderExamQuestion();

 renderExamAnswerSheet();

}


function renderExamAnswerSheet() {

 const container =
   document.getElementById(
     "examAnswerSheet"
   );


 if (!container) {

   return;

 }


 container.innerHTML =
   examState.questions
     .map(
       (
         question,
         index
       ) => {

         const answered =
           examState.answers[
             question.id
           ] !== undefined;


         const current =
           index ===
           examState.current;


         const flagged =
           examState.flagged[
             question.id
           ];


         return `

           <button
             class="
               answer-number
               ${answered ? "answered" : ""}
               ${current ? "current" : ""}
               ${flagged ? "flagged" : ""}
             "
             onclick="jumpToExamQuestion(${index})"
           >
             ${index + 1}
           </button>

         `;

       }
     ).join("");

}


function jumpToExamQuestion(
 index
) {

 examState.current =
   index;


 renderExamQuestion();

 renderExamAnswerSheet();

}


function submitExam() {

 clearInterval(
   examState.timer
 );


 let correctCount =
   0;


 const results =
   examState.questions.map(
     question => {

       const userAnswer =
         examState.answers[
           question.id
         ];


       const correct =
         gradeQuestion(
           question,
           userAnswer
         );


       if (correct) {

         correctCount++;

       }


       const result = {

         questionId:
           question.id,

         prompt:
           question.prompt,

         userAnswer,

         correctAnswer:
           formatAnswer(
             question,
             question.correct
           ),

         correct,

         explanation:
           question.explanation,

         subject:
           question.subject,

         topic:
           question.topic,

         type:
           question.type

       };


       if (!correct) {

         saveMistake(
           result
         );

       }


       updateTopicPerformance(
         question,
         correct
       );


       return result;

     }
   );


 const total =
   examState.questions.length;


 const score =
   total
     ? (
         correctCount /
         total
       ) * 100
     : 0;


 data.examHistory.unshift({

   title:
     "Structural Engineering Mock Examination",

   score,

   correct:
     correctCount,

   total,

   results,

   durationSeconds:
     1800 -
     examState.secondsRemaining,

   date:
     new Date().toISOString()

 });


 data.examHistory =
   data.examHistory.slice(
     0,
     50
   );


 data.questionsAnswered +=
   total;


 saveData();


 renderExamResults(
   score,
   correctCount,
   total,
   results
 );


 showPage(
   "examResultsPage"
 );

}


function renderExamResults(
 score,
 correct,
 total,
 results
) {

 document.getElementById(
   "examScoreDisplay"
 ).textContent =
   `${score.toFixed(1)}%`;


 document.getElementById(
   "examScoreSummary"
 ).textContent =
   `${correct} out of ${total} correct`;


 const container =
   document.getElementById(
     "examResultsList"
   );


 container.innerHTML =
   results.map(
     (
       result,
       index
     ) => `

       <div
         class="result-item ${result.correct ? "correct" : "incorrect"}"
       >

         <div class="result-status">

           ${result.correct
             ? "✓ CORRECT"
             : "✕ NEEDS REVIEW"}

         </div>

         <h3>
           ${index + 1}.
           ${escapeHTML(result.prompt)}
         </h3>

         <p>
           <strong>Your answer:</strong>
           ${escapeHTML(
             formatAnswerForDisplay(
               result.userAnswer
             )
           )}
         </p>

         ${
           !result.correct
             ? `
               <p>
                 <strong>Correct answer:</strong>
                 ${escapeHTML(
                   result.correctAnswer
                 )}
               </p>
             `
             : ""
         }

         <p class="result-explanation">
           💡 ${escapeHTML(
             result.explanation
           )}
         </p>

       </div>

     `
   ).join("");

}


/* =========================================================
  TUTOR
========================================================= */

let tutorState = {

 mode:
   "teach",

 subject:
   "steel",

 topic:
   "",

 level:
   "standard"

};


function initializeTutor() {

 updateStudentNameDisplays();

 updateTutorTopics();

}


function updateTutorTopics() {

 const subject =
   document.getElementById(
     "tutorSubject"
   )?.value;


 const select =
   document.getElementById(
     "tutorTopic"
   );


 if (!subject || !select) {

   return;

 }


 const topics =
   subjectTopics[subject] || [];


 select.innerHTML =
   topics.map(
     topic =>
       `<option value="${escapeAttribute(topic.name)}">
         ${escapeHTML(topic.name)}
       </option>`
   ).join("");


 tutorState.subject =
   subject;


 tutorState.topic =
   topics[0]?.name || "";

}


function setTutorMode(
 mode,
 button
) {

 tutorState.mode =
   mode;


 document
   .querySelectorAll(
     ".tutor-mode"
   )
   .forEach(
     item =>
       item.classList.remove(
         "active"
       )
   );


 if (button) {

   button.classList.add(
     "active"
   );

 }


 const label =
   document.getElementById(
     "tutorInputLabel"
   );


 const input =
   document.getElementById(
     "tutorInput"
   );


 const settings = {

   teach: {

     label:
       "What do you want to learn?",

     placeholder:
       "Example: Explain how buckling affects a compression member."

   },

   hint: {

     label:
       "What problem are you stuck on?",

     placeholder:
       "Paste the problem and tell me where you're stuck. I'll give you a hint without immediately giving the answer."

   },

   check: {

     label:
       "Show me your work",

     placeholder:
       "Paste your solution, calculations, or reasoning here. I'll identify the first step that needs correction."

   },

   practice: {

     label:
       "What do you want to practice?",

     placeholder:
       "Example: Give me a reinforced concrete flexure problem."

   },

   mistakes: {

     label:
       "What mistake do you want to understand?",

     placeholder:
       "Tell me what confused you, or leave this blank to focus on your recent mistakes."

   },

   guided: {

     label:
       "What engineering problem are you solving?",

     placeholder:
       "Paste the complete problem here. We'll solve it one step at a time."

   }

 };


 const setting =
   settings[mode] ||
   settings.teach;


 if (label) {

   label.textContent =
     setting.label;

 }


 if (input) {

   input.placeholder =
     setting.placeholder;

 }

}


async function runEngineeringTutor() {

 const subject =
   document.getElementById(
     "tutorSubject"
   ).value;


 const topic =
   document.getElementById(
     "tutorTopic"
   ).value;


 const input =
   document.getElementById(
     "tutorInput"
   ).value.trim();


 const level =
   document.getElementById(
     "tutorLevel"
   ).value;


 const response =
   document.getElementById(
     "tutorResponse"
   );


 if (
   !input &&
   tutorState.mode !==
     "mistakes"
 ) {

   alert(
     "Tell your tutor what you need help with first."
   );

   return;

 }


 tutorState.subject =
   subject;


 tutorState.topic =
   topic;


 tutorState.level =
   level;


 response.innerHTML = `

   <div class="tutor-loading">

     🤖

     <br><br>

     Your engineering tutor is thinking...

   </div>

 `;


 /*
   The real AI backend will be connected
   later.

   For now this uses the built-in tutor.
 */


 await new Promise(
   resolve =>
     setTimeout(
       resolve,
       500
     )
 );


 const answer =
   generateTutorResponse({

     mode:
       tutorState.mode,

     subject,

     topic,

     input,

     level

   });


 response.innerHTML =
   renderLocalTutorResponse(
     answer
   );


 saveTutorHistory({

   mode:
     tutorState.mode,

   subject,

   topic,

   input,

   response:
     answer,

   date:
     new Date().toISOString()

 });


 renderEngineeringDashboard();

}


function saveTutorHistory(
 item
) {

 if (
   !data.tutorHistory
 ) {

   data.tutorHistory =
     [];

 }


 data.tutorHistory.unshift(
   item
 );


 data.tutorHistory =
   data.tutorHistory.slice(
     0,
     50
   );


 saveData();

}


function generateTutorResponse({
 mode,
 subject,
 topic,
 input,
 level
}) {

 if (
   mode === "hint"
 ) {

   return generateHintResponse(
     subject,
     topic,
     input
   );

 }


 if (
   mode === "check"
 ) {

   return generateCheckResponse(
     subject,
     topic,
     input
   );

 }


 if (
   mode === "practice"
 ) {

   return generatePracticeProblem(
     subject,
     topic
   );

 }


 if (
   mode === "mistakes"
 ) {

   return generateMistakeResponse();

 }


 if (
   mode === "guided"
 ) {

   return generateGuidedResponse(
     subject,
     topic,
     input
   );

 }


 return generateTeachingResponse(
   subject,
   topic,
   input,
   level
 );

}


function generateTeachingResponse(
 subject,
 topic,
 input,
 level
) {

 return `

**${escapeMarkdown(topic)}**

Let's approach this like an engineering student, not just by memorizing equations.

### 1. Core idea

First identify the physical behavior involved in **${escapeMarkdown(topic)}**.

Ask yourself:

- What load or action is affecting the member?
- What deformation or response occurs?
- What limit state are we checking?
- Which properties of the material or geometry control the behavior?

### 2. Engineering mindset

Before calculating, identify:

**Given → Unknown → Behavior → Equation → Calculation → Interpretation**

This prevents you from jumping into a formula without understanding what it represents.

### 3. Your question

You asked:

> ${escapeMarkdown(input || "Help me understand this topic.")}

A good next step is to identify the governing structural behavior before choosing an equation.

### 4. Important reminder

For actual design, code-specific values, limitations, load combinations, resistance factors, detailing requirements, and other provisions should be checked against the applicable adopted reference.

### 5. Try this

Explain in your own words what you think **${escapeMarkdown(topic)}** means physically.

I'll check your explanation and help you improve it.

 `;

}


function generateHintResponse(
 subject,
 topic,
 input
) {

 return `

**💡 Hint — ${escapeMarkdown(topic)}**

Don't calculate yet.

Start by identifying:

1. What information is given?
2. What quantity are you being asked to find?
3. Is the member primarily experiencing axial force, bending, shear, or a combination?
4. What structural behavior controls?

### Your problem

> ${escapeMarkdown(input)}

**First hint:**

Look for the physical behavior that the problem is describing.

Don't choose the equation yet.

Tell me what you think the **governing behavior** is, and we'll take the next step together.

 `;

}


function generateCheckResponse(
 subject,
 topic,
 input
) {

 return `

**✅ Let's check your work**

Topic:

**${escapeMarkdown(topic)}**

You submitted:

> ${escapeMarkdown(input)}

### Check these items

Before looking at the final answer, verify:

**1. Units**

Are all quantities expressed consistently?

**2. Given values**

Did you copy every value correctly?

**3. Governing equation**

Does the equation actually describe the behavior being checked?

**4. Substitution**

Were the values substituted into the correct variables?

**5. Interpretation**

Does the final result make physical sense?

### Engineering habit

When checking your own solution, don't start with:

> "Is my final answer right?"

Start with:

> "Where could my first incorrect assumption or calculation have occurred?"

If you paste the problem statement together with your work, the tutor can check it step-by-step.

 `;

}


function generatePracticeProblem(
 subject,
 topic
) {

 return `

**📝 Practice Problem**

### ${escapeMarkdown(topic)}

Here's a conceptual engineering practice problem:

A structural member is subjected to a design action that produces a significant response associated with **${escapeMarkdown(topic)}**.

Determine the governing structural behavior and identify the information you would need before beginning the calculation.

### Your task

1. Identify the given information.
2. Identify the unknown.
3. Identify the governing behavior.
4. Select the appropriate general relationship.
5. State the units you would use.
6. Explain what your final result would mean physically.

**Don't jump straight to the equation.**

Start by telling me:

> **What do you think the governing behavior is?**

 `;

}


function generateMistakeResponse() {

 if (
   !data.mistakes.length
 ) {

   return `

**🔍 Mistake Review**

You don't have any recorded mistakes yet.

Take a quiz first.

When you get a question wrong, I'll save it here so we can review:

- What you answered
- What the correct answer was
- Why the mistake happened
- What concept you should review

 `;

 }


 const mistake =
   data.mistakes[0];


 return `

**🔍 Let's Review a Mistake**

### Topic

${escapeMarkdown(mistake.topic)}

### Question

${escapeMarkdown(mistake.prompt)}

### Your answer

${escapeMarkdown(
   formatAnswerForDisplay(
     mistake.userAnswer
   )
 )}

### Correct answer

${escapeMarkdown(
   mistake.correctAnswer
 )}

### Explanation

${escapeMarkdown(
   mistake.explanation
 )}

### Think about it

Instead of simply memorizing the correct answer, ask:

**What concept caused my original answer to seem reasonable?**

That's usually where the real learning happens.

 `;

}


function generateGuidedResponse(
 subject,
 topic,
 input
) {

 return `

**🪜 Step-by-Step Engineering Mode**

We're going to solve this together.

### Step 1 — Identify the given

From the problem:

> ${escapeMarkdown(input)}

Start by listing every value that is explicitly given.

For example:

- Geometry
- Material properties
- Loads
- Support conditions
- Reinforcement
- Prestressing information
- Any specified design parameters

### Your turn

**List the given values first.**

Don't calculate anything yet.

Once you've identified the givens, we'll move to:

**Step 2 — Identify the unknown**

Then:

**Step 3 — Determine the governing behavior**

Then:

**Step 4 — Select the equation**

Then we'll calculate and interpret the result together.

 `;

}


function renderLocalTutorResponse(
 text
) {

 const escaped =
   escapeHTML(text);


 const formatted =
   escaped

     .replace(
       /\*\*(.*?)\*\*/g,
       "<strong>$1</strong>"
     )

     .replace(
       /^### (.*)$/gm,
       "<h3>$1</h3>"
     )

     .replace(
       /^## (.*)$/gm,
       "<h2>$1</h2>"
     )

     .replace(
       /\n\n/g,
       "</p><p>"
     )

     .replace(
       /\n/g,
       "<br>"
     );


 return `

   <div class="tutor-response-header">

     <div class="tutor-response-icon">
       🤖
     </div>

     <div>

       <span class="eyebrow">
         ENGINEERING TUTOR
       </span>

       <h2>
         Tutor Response
       </h2>

     </div>

   </div>

   <div class="tutor-ai-content">

     <p>
       ${formatted}
     </p>

   </div>

 `;

}


/* =========================================================
  FORMULA LIBRARY
========================================================= */

const formulaLibrary = [

 {
   id:
     "normal-stress",

   category:
     "steel",

   title:
     "Average Normal Stress",

   topic:
     "Fundamentals of Steel Design",

   description:
     "Basic relationship between axial force and cross-sectional area.",

   equation:
     "σ = P / A"
 },


 {
   id:
     "steel-tension",

   category:
     "steel",

   title:
     "Average Tension Stress",

   topic:
     "Tension Members",

   description:
     "Useful starting relationship for axial tension.",

   equation:
     "σ = T / A"
 },


 {
   id:
     "steel-weld-throat",

   category:
     "steel",

   title:
     "Fillet Weld Effective Throat",

   topic:
     "Welded Connections",

   description:
     "Geometric relationship used when considering the effective throat of a standard fillet weld.",

   equation:
     "tₑ ≈ 0.707w"
 },


 {
   id:
     "prestress-direct",

   category:
     "prestressed",

   title:
     "Direct Prestress Stress",

   topic:
     "Concrete Stress Due to Prestress",

   description:
     "Average direct stress from a concentric prestressing force.",

   equation:
     "σ = P / A"
 },


 {
   id:
     "prestress-eccentric",

   category:
     "prestressed",

   title:
     "Combined Direct + Bending Stress",

   topic:
     "Concrete Stress Due to Prestress",

   description:
     "Conceptual elastic relationship for combined axial force and eccentricity.",

   equation:
     "σ = P/A ± Pe/S"
 }

];


let formulaFilter =
 "all";


function isFormulaFavorite(
 formulaId
) {

 return data.formulaFavorites
   .includes(
     formulaId
   );

}


function toggleFormulaFavorite(
 formulaId
) {

 const index =
   data.formulaFavorites
     .indexOf(
       formulaId
     );


 if (
   index === -1
 ) {

   data.formulaFavorites.push(
     formulaId
   );

 }

 else {

   data.formulaFavorites.splice(
     index,
     1
   );

 }


 saveData();

 renderFormulaLibrary();

}


function filterFormulaCategory(
 category,
 button
) {

 formulaFilter =
   category;


 document
   .querySelectorAll(
     ".formula-filter"
   )
   .forEach(
     item =>
       item.classList.remove(
         "active"
       )
   );


 if (button) {

   button.classList.add(
     "active"
   );

 }


 renderFormulaLibrary();

}


function searchFormulas() {

 renderFormulaLibrary();

}


function renderFormulaLibrary() {

 const container =
   document.getElementById(
     "formulaGrid"
   );


 if (!container) {

   return;

 }


 const search =
   document.getElementById(
     "formulaSearch"
   )?.value
     .trim()
     .toLowerCase() ||
   "";


 let formulas =
   formulaLibrary.filter(
     formula => {

       const matchesSearch =
         !search ||
         formula.title
           .toLowerCase()
           .includes(search) ||
         formula.topic
           .toLowerCase()
           .includes(search) ||
         formula.description
           .toLowerCase()
           .includes(search);


       const matchesFilter =
         formulaFilter === "all" ||

         (
           formulaFilter ===
           "favorites" &&
           isFormulaFavorite(
             formula.id
           )
         ) ||

         formula.category ===
           formulaFilter;


       return (
         matchesSearch &&
         matchesFilter
       );

     }
   );


 if (!formulas.length) {

   container.innerHTML = `

     <div class="empty-state">

       No formulas found.

     </div>

   `;

   return;

 }


 container.innerHTML =
   formulas.map(
     formula => `

       <div class="formula-card">

         <span class="eyebrow">
           ${formatSubjectName(formula.category)}
         </span>

         <h3>
           ${escapeHTML(formula.title)}
         </h3>

         <p>
           ${escapeHTML(formula.description)}
         </p>

         <div class="formula-equation">
           ${escapeHTML(formula.equation)}
         </div>

         <div class="formula-card-actions">

           <button
             class="secondary-btn"
             onclick="openFormulaInSolver('${formula.id}')"
           >
             ⚡ Solve This Formula
           </button>

           <button
             class="icon-btn"
             onclick="toggleFormulaFavorite('${formula.id}')"
             title="Favorite formula"
           >
             ${
               isFormulaFavorite(
                 formula.id
               )
                 ? "★"
                 : "☆"
             }
           </button>

         </div>

       </div>

     `
   ).join("");

}


function openFormulaInSolver(
 formulaId
) {

 const mapping = {

   "normal-stress": {
     category:
       "steel",

     problem:
       "average-stress"
   },

   "steel-tension": {
     category:
       "steel",

     problem:
       "average-stress"
   },

   "steel-weld-throat": {
     category:
       "steel",

     problem:
       "fillet-weld-throat"
   },

   "prestress-direct": {
     category:
       "prestressed",

     problem:
       "prestress-stress"
   },

   "prestress-eccentric": {
     category:
       "prestressed",

     problem:
       "eccentric-prestress"
   }

 };


 const selected =
   mapping[
     formulaId
   ];


 showPage(
   "solverPage"
 );


 if (!selected) {

   return;

 }


 document.getElementById(
   "solverCategory"
 ).value =
   selected.category;


 updateSolverProblems(
   selected.problem
 );

}


/* =========================================================
  ENGINEERING SOLVER
========================================================= */

let currentSolverCategory =
 "steel";


let currentSolverProblem =
 "average-stress";


const solverProblems = {

 steel: [

   {
     id:
       "average-stress",

     name:
       "Average Axial Stress",

     inputs: [
       {
         id:
           "P",

         label:
           "Axial Force P",

         unit:
           "kN"
       },

       {
         id:
           "A",

         label:
           "Area A",

         unit:
           "mm²"
       }
     ]
   },

   {
     id:
       "fillet-weld-throat",

     name:
       "Fillet Weld Effective Throat",

     inputs: [
       {
         id:
           "w",

         label:
           "Fillet Weld Leg Size w",

         unit:
           "mm"
       }
     ]
   }

 ],


 reinforcedConcrete: [

   {
     id:
       "moment",

     name:
       "Basic Flexural Relationship",

     inputs: [
       {
         id:
           "As",

         label:
           "Steel Area As",

         unit:
           "mm²"
       },

       {
         id:
           "fy",

         label:
           "Steel Yield Strength fy",

         unit:
           "MPa"
       },

       {
         id:
           "d",

         label:
           "Effective Depth d",

         unit:
           "mm"
       }
     ]
   }

 ],


 prestressed: [

   {
     id:
       "prestress-stress",

     name:
       "Direct Prestress Stress",

     inputs: [
       {
         id:
           "P",

         label:
           "Prestressing Force P",

         unit:
           "kN"
       },

       {
         id:
           "A",

         label:
           "Concrete Area A",

         unit:
           "mm²"
       }
     ]
   },

   {
     id:
       "eccentric-prestress",

     name:
       "Eccentric Prestress Stress",

     inputs: [
       {
         id:
           "P",

         label:
           "Prestressing Force P",

         unit:
           "kN"
       },

       {
         id:
           "A",

         label:
           "Area A",

         unit:
           "mm²"
       },

       {
         id:
           "e",

         label:
           "Eccentricity e",

         unit:
           "mm"
       },

       {
         id:
           "S",

         label:
           "Section Modulus S",

         unit:
           "mm³"
       }
     ]
   }

 ]

};


function updateSolverProblems(
 preferredProblem
) {

 const category =
   document.getElementById(
     "solverCategory"
   )?.value ||
   "steel";


 currentSolverCategory =
   category;


 const select =
   document.getElementById(
     "solverProblem"
   );


 if (!select) {

   return;

 }


 const problems =
   solverProblems[
     category
   ] || [];


 select.innerHTML =
   problems.map(
     problem =>
       `<option value="${problem.id}">
         ${escapeHTML(problem.name)}
       </option>`
   ).join("");


 const selected =
   preferredProblem &&
   problems.some(
     problem =>
       problem.id ===
       preferredProblem
   )
     ? preferredProblem
     : problems[0]?.id;


 if (selected) {

   select.value =
     selected;

 }


 currentSolverProblem =
   selected;


 renderSolverInputs();

}


function renderSolverInputs() {

 const category =
   document.getElementById(
     "solverCategory"
   )?.value ||
   "steel";


 const problemId =
   document.getElementById(
     "solverProblem"
   )?.value;


 currentSolverCategory =
   category;


 currentSolverProblem =
   problemId;


 const problem =
   solverProblems[
     category
   ]?.find(
     item =>
       item.id ===
       problemId
   );


 const container =
   document.getElementById(
     "solverInputs"
   );


 if (!problem || !container) {

   return;

 }


 container.innerHTML =
   problem.inputs.map(
     input => `

       <div class="form-group">

         <label>
           ${escapeHTML(input.label)}
           (${escapeHTML(input.unit)})
         </label>

         <input
           id="solver-${input.id}"
           type="number"
           step="any"
           placeholder="Enter ${escapeHTML(input.label)}"
         >

       </div>

     `
   ).join("");

}


function solveEngineeringProblem() {

 const category =
   document.getElementById(
     "solverCategory"
   ).value;


 const problemId =
   document.getElementById(
     "solverProblem"
   ).value;


 const output =
   document.getElementById(
     "solverOutput"
   );


 const problem =
   solverProblems[
     category
   ]?.find(
     item =>
       item.id ===
       problemId
   );


 if (!problem) {

   return;

 }


 const values = {};


 let missing =
   false;


 problem.inputs.forEach(
   input => {

     const element =
       document.getElementById(
         `solver-${input.id}`
       );


     const value =
       Number(
         element?.value
       );


     if (
       !Number.isFinite(value)
     ) {

       missing =
         true;

     }


     values[
       input.id
     ] =
       value;

   }
 );


 if (missing) {

   alert(
     "Please enter all required values."
   );

   return;

 }


 let result;


 let formula;


 let substitution;


 let interpretation;


 if (
   category === "steel" &&
   problemId ===
     "average-stress"
 ) {

   result =
     (
       values.P * 1000
     ) /
     values.A;


   formula =
     "σ = P / A";


   substitution =
     `σ = (${values.P} kN × 1000 N/kN) / ${values.A} mm²`;


   interpretation =
     "This gives the average axial stress based on the supplied axial force and area.";

 }


 else if (
   category === "steel" &&
   problemId ===
     "fillet-weld-throat"
 ) {

   result =
     0.707 *
     values.w;


   formula =
     "tₑ ≈ 0.707w";


   substitution =
     `tₑ ≈ 0.707(${values.w} mm)`;


   interpretation =
     "This is the geometric effective throat relationship for the assumed standard fillet weld geometry.";

 }


 else if (
   category ===
     "prestressed" &&
   problemId ===
     "prestress-stress"
 ) {

   result =
     (
       values.P * 1000
     ) /
     values.A;


   formula =
     "σ = P / A";


   substitution =
     `σ = (${values.P} kN × 1000 N/kN) / ${values.A} mm²`;


   interpretation =
     "This represents the average direct stress magnitude from the concentric prestressing force.";

 }


 else if (
   category ===
     "prestressed" &&
   problemId ===
     "eccentric-prestress"
 ) {

   const direct =
     (
       values.P * 1000
     ) /
     values.A;


   const bending =
     (
       values.P *
       1000 *
       values.e
     ) /
     values.S;


   result = {

     direct,

     bending,

     max:
       direct + bending,

     min:
       direct - bending

   };


   formula =
     "σ = P/A ± Pe/S";


   substitution =
     `σ = ${direct.toFixed(3)} ± ${bending.toFixed(3)} MPa`;


   interpretation =
     "The two extreme stresses reflect the combined effects of direct prestress and the moment caused by eccentricity.";

 }


 else if (
   category ===
     "reinforcedConcrete" &&
   problemId ===
     "moment"
 ) {

   result =
     (
       values.As *
       values.fy *
       values.d
     ) /
     1000000;


   formula =
     "M ≈ As fy d";


   substitution =
     `M ≈ (${values.As})(${values.fy})(${values.d}) / 1,000,000`;


   interpretation =
     "This is a simplified educational flexural relationship and is not a complete code-based reinforced concrete design check.";

 }


 if (
   typeof result ===
   "object"
 ) {

   output.innerHTML = `

     <div class="solver-step">

       <span class="solver-step-label">
         RESULT
       </span>

       <h2>
         Stress Range
       </h2>

       <p>
         Direct:
         <strong>
           ${result.direct.toFixed(3)} MPa
         </strong>
       </p>

       <p>
         Bending component:
         <strong>
           ${result.bending.toFixed(3)} MPa
         </strong>
       </p>

       <p>
         Maximum:
         <strong>
           ${result.max.toFixed(3)} MPa
         </strong>
       </p>

       <p>
         Minimum:
         <strong>
           ${result.min.toFixed(3)} MPa
         </strong>
       </p>

     </div>

     <div class="solver-step">

       <span class="solver-step-label">
         FORMULA
       </span>

       <div class="solver-equation">
         ${formula}
       </div>

     </div>

     <div class="solver-step">

       <span class="solver-step-label">
         SUBSTITUTION
       </span>

       <p>
         ${substitution}
       </p>

     </div>

     <div class="solver-step">

       <span class="solver-step-label">
         INTERPRETATION
       </span>

       <p>
         ${interpretation}
       </p>

     </div>

   `;

 }

 else {

   output.innerHTML = `

     <div class="solver-step">

       <span class="solver-step-label">
         RESULT
       </span>

       <h2>
         ${result.toFixed(3)}
       </h2>

     </div>

     <div class="solver-step">

       <span class="solver-step-label">
         FORMULA
       </span>

       <div class="solver-equation">
         ${formula}
       </div>

     </div>

     <div class="solver-step">

       <span class="solver-step-label">
         SUBSTITUTION
       </span>

       <p>
         ${substitution}
       </p>

     </div>

     <div class="solver-step">

       <span class="solver-step-label">
         INTERPRETATION
       </span>

       <p>
         ${interpretation}
       </p>

     </div>

     <div class="tutor-disclaimer">

       ⚠️ This is an educational calculation.
       It is not a complete code-based design check.

     </div>

   `;

 }


 data.solverHistory.unshift({

   category,

   problem:
     problem.name,

   values,

   result,

   date:
     new Date().toISOString()

 });


 data.solverHistory =
   data.solverHistory.slice(
     0,
     100
   );


 saveData();

}


/* =========================================================
  UTILITY FUNCTIONS
========================================================= */

function formatSubjectName(
 subject
) {

 const names = {

   steel:
     "Steel Design",

   reinforcedConcrete:
     "Reinforced Concrete",

   prestressedConcrete:
     "Prestressed Concrete",

   prestressed:
     "Prestressed Concrete",

   mixed:
     "Mixed Practice",

   adaptive:
     "Smart Practice"

 };


 return (
   names[subject] ||
   subject
 );

}


function escapeHTML(
 value
) {

 return String(
   value ?? ""
 )
   .replace(
     /&/g,
     "&amp;"
   )
   .replace(
     /</g,
     "&lt;"
   )
   .replace(
     />/g,
     "&gt;"
   )
   .replace(
     /"/g,
     "&quot;"
   )
   .replace(
     /'/g,
     "&#039;"
   );

}


function escapeAttribute(
 value
) {

 return escapeHTML(
   value
 );

}


/* =========================================================
  INITIALIZATION
========================================================= */

function initializeApp() {

 /*
   If the student already registered,
   skip the welcome page.
 */

 if (data.name) {

   updateStudentNameDisplays();

   showPage(
     "homePage"
   );

 }

 else {

   showPage(
     "welcomePage"
   );

 }


 renderSubjectTopics();

 updateQuizTopics();

 initializeTutor();

 renderFormulaLibrary();

 updateSolverProblems();

 renderEngineeringDashboard();

 renderAdaptivePage();

}


/* =========================================================
  START APP
========================================================= */

document.addEventListener(
 "DOMContentLoaded",
 initializeApp
);