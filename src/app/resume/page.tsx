import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Resume — Sajan Yogi",
  robots: "noindex",
};

export default function ResumePage() {
  return (
    <>
      <style>{`
        .resume-body {
          background: #CBD5E0;
          min-height: 100vh;
          padding: 100px 20px 60px;
          font-family: 'Inter', sans-serif;
        }
        .toolbar {
          max-width: 760px;
          margin: 0 auto 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .btn-print {
          background: #1A202C;
          color: #fff;
          border: none;
          padding: 8px 20px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .btn-print:hover { background: #2D3748; }
        .paper {
          max-width: 760px;
          margin: 0 auto;
          background: #fff;
          box-shadow: 0 4px 40px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.08);
          padding: 36px 52px 40px;
        }
        .resume-header { text-align: center; padding-bottom: 12px; margin-bottom: 14px; border-bottom: 2px solid #1A202C; }
        .resume-name { font-family: 'Georgia', serif; font-size: 34px; font-weight: 500; color: #1A202C; letter-spacing: 0.01em; line-height: 1.1; }
        .resume-title { font-size: 10.5px; font-weight: 500; color: #718096; letter-spacing: 0.16em; text-transform: uppercase; margin-top: 5px; }
        .resume-contacts { margin-top: 10px; display: flex; flex-wrap: wrap; justify-content: center; gap: 4px; font-size: 11px; color: #4A5568; }
        .resume-contacts a { color: #4A5568; text-decoration: none; }
        .resume-contacts a:hover { color: #1A202C; text-decoration: underline; }
        .sep { color: #CBD5E0; padding: 0 4px; }
        .section { margin-bottom: 13px; }
        .section:last-child { margin-bottom: 0; }
        .section-heading { font-size: 9.5px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #2D3748; border-bottom: 2px solid #1A202C; padding-bottom: 4px; margin-bottom: 9px; }
        .summary { font-size: 12px; line-height: 1.6; color: #2D3748; }
        .exp-item { margin-bottom: 10px; }
        .exp-item:last-child { margin-bottom: 0; }
        .exp-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
        .exp-role { font-size: 12.5px; font-weight: 600; color: #1A202C; }
        .exp-dates { font-size: 11px; color: #718096; white-space: nowrap; flex-shrink: 0; }
        .exp-company { font-size: 11.5px; color: #4A5568; font-weight: 500; margin-top: 1px; }
        .exp-company em { font-style: normal; color: #718096; font-weight: 400; }
        .exp-bullets { margin-top: 4px; list-style: none; }
        .exp-bullets li { font-size: 11.5px; line-height: 1.55; color: #2D3748; padding-left: 12px; position: relative; margin-bottom: 1px; }
        .exp-bullets li::before { content: '–'; position: absolute; left: 0; color: #CBD5E0; }
        .project-item { margin-bottom: 6px; }
        .project-item:last-child { margin-bottom: 0; }
        .project-name { font-size: 12px; font-weight: 600; color: #1A202C; }
        .project-name a { color: inherit; text-decoration: none; }
        .project-name a:hover { text-decoration: underline; }
        .project-desc { font-size: 11.5px; color: #4A5568; line-height: 1.6; margin-top: 1px; }
        .project-stack { font-size: 10.5px; color: #A0AEC0; margin-top: 2px; font-style: italic; }
        .skills-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .skill-group-label { font-size: 10px; font-weight: 600; color: #2D3748; margin-bottom: 4px; letter-spacing: 0.04em; }
        .skill-list { font-size: 11px; color: #4A5568; line-height: 1.6; }
        .meta-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
        .edu-degree { font-size: 11.5px; font-weight: 600; color: #1A202C; }
        .edu-school { font-size: 11px; color: #4A5568; margin-top: 2px; }
        .edu-year { font-size: 10.5px; color: #718096; margin-top: 1px; }
        .cert-item { font-size: 11.5px; color: #2D3748; line-height: 1.6; margin-bottom: 4px; }
        .cert-item span { display: block; font-size: 10.5px; color: #718096; }
        .tool-tags { display: flex; flex-wrap: wrap; gap: 5px; }
        .tool-tag { font-size: 10px; background: #F7FAFC; border: 1px solid #E2E8F0; border-radius: 4px; padding: 2px 7px; color: #4A5568; font-weight: 500; }
        .divider { border: none; border-top: 1px solid #E2E8F0; margin: 11px 0; }
        @media print {
          nav, .toolbar { display: none !important; }
          .resume-body { background: #fff; padding: 0; }
          .paper { box-shadow: none; padding: 24px 44px 28px; max-width: 100%; }
          body { padding-top: 0 !important; }
        }
        @media (max-width: 640px) {
          .paper { padding: 40px 28px 52px; }
          .skills-grid { grid-template-columns: repeat(2, 1fr); }
          .meta-row { grid-template-columns: 1fr; gap: 20px; }
        }
      `}</style>

      <div className="resume-body">
        <div className="toolbar">
          <Link href="/" style={{ fontSize: "13px", color: "#4A5568", textDecoration: "none" }}>← sazan.com.np</Link>
          <PrintButton />
        </div>

        <div className="paper">
          <header className="resume-header">
            <div className="resume-name">Sajan Yogi</div>
            <div className="resume-title">Data Analyst &nbsp;·&nbsp; AI Automation &nbsp;·&nbsp; Big Data Analytics Graduate</div>
            <div className="resume-contacts">
              <span>+1 (437) 430-0348</span>
              <span className="sep">|</span>
              <a href="mailto:sazanyogi@gmail.com">sazanyogi@gmail.com</a>
              <span className="sep">|</span>
              <a href="https://sazan.com.np" target="_blank" rel="noopener noreferrer">sazan.com.np</a>
              <span className="sep">|</span>
              <a href="https://www.linkedin.com/in/sajanyogi" target="_blank" rel="noopener noreferrer">linkedin.com/in/sajanyogi</a>
              <span className="sep">|</span>
              <span>Mississauga, Ontario</span>
            </div>
          </header>

          <div className="section">
            <div className="section-heading">Summary</div>
            <p className="summary">Data-focused technologist with a Postgraduate Certificate in Big Data Analytics (Lambton College, 2024) and a Bachelor of Engineering in Computer Science. Experienced building AI-powered automation pipelines, serverless data endpoints, and workflow systems using Python, SQL, Claude/OpenAI APIs, Modal, and n8n. Background in IT infrastructure and systems administration gives strong practical grounding in cloud environments (Azure AD, Google Workspace, Firebase). Currently targeting Data Analyst, BI Analyst, and AI Automation roles in Canada — with hands-on portfolio projects already in production.</p>
          </div>

          <hr className="divider" />

          <div className="section">
            <div className="section-heading">Experience</div>

            <div className="exp-item">
              <div className="exp-header">
                <div className="exp-role">Technical Lead</div>
                <div className="exp-dates">2025 — Present</div>
              </div>
              <div className="exp-company">Click &amp; Cast Inc. <em>— Mississauga, ON</em></div>
              <ul className="exp-bullets">
                <li>Built and deployed AI-powered automation pipelines integrating Claude and OpenAI APIs with n8n workflows for automated client outreach, email processing, and content generation.</li>
                <li>Developed serverless REST API endpoints using Python, FastAPI, and Modal — connected to n8n for real-time data processing and workflow orchestration.</li>
                <li>Reduced manual operational tasks by 40% through scripted automation of reporting, scheduling, and communications workflows.</li>
                <li>Manage cloud infrastructure including DNS, hosting, Google Workspace admin, and SSL across all production environments.</li>
              </ul>
            </div>

            <div className="exp-item">
              <div className="exp-header">
                <div className="exp-role">Junior Data &amp; Systems Analyst</div>
                <div className="exp-dates">Oct 2021 — Apr 2023</div>
              </div>
              <div className="exp-company">Freelance <em>— Ontario, Canada</em></div>
              <ul className="exp-bullets">
                <li>Analyzed system logs, network traffic, and incident patterns across 10+ small business clients to identify root causes and recommend preventive solutions.</li>
                <li>Tracked and reported on operational metrics including ticket volume, resolution times, and recurring issue trends — surfacing insights to reduce repeat incidents.</li>
                <li>Managed structured user and permissions data across Active Directory, Microsoft 365, and Google Workspace environments for multiple organizations.</li>
                <li>Built and maintained technical documentation and process guides that reduced repeat ticket volume and improved knowledge transfer across client teams.</li>
              </ul>
            </div>

            <div className="exp-item">
              <div className="exp-header">
                <div className="exp-role">Supervisor</div>
                <div className="exp-dates">Aug 2023 — Dec 2024</div>
              </div>
              <div className="exp-company">Tim Hortons <em>— Mississauga, ON</em></div>
              <ul className="exp-bullets">
                <li>Led a team of 8–12 staff, managing scheduling, training, and performance in a fast-paced customer-facing environment.</li>
                <li>Resolved escalated customer issues promptly, demonstrating strong communication and problem-solving skills under pressure.</li>
                <li>Oversaw cash handling, inventory, and compliance with company standards — developed strong attention to detail and accountability.</li>
              </ul>
            </div>

            <div className="exp-item">
              <div className="exp-header">
                <div className="exp-role">Data &amp; Automation Developer</div>
                <div className="exp-dates">Feb 2020 — Present</div>
              </div>
              <div className="exp-company">Independent Projects</div>
              <ul className="exp-bullets">
                <li>Built an AI-powered job hunting bot that scrapes LinkedIn, Remotive, and WeWorkRemotely daily, scores postings against a candidate profile using Claude AI, generates tailored cover letters, and delivers an email digest — all automated on a serverless cron schedule.</li>
                <li>Developed real-time web applications with Firebase/Firestore back-end including a live sports scoreboard platform and a multi-user budgeting PWA.</li>
                <li>Designed and deployed multiple Python REST APIs on Modal (FastAPI) integrated with n8n for automated data pipelines and client-facing workflows.</li>
              </ul>
            </div>
          </div>

          <hr className="divider" />

          <div className="section">
            <div className="section-heading">Selected Projects</div>
            <div className="project-item">
              <div className="project-name"><a href="https://scorecast.clickandcast.com/" target="_blank" rel="noopener noreferrer">Scorecast</a> — scorecast.clickandcast.com</div>
              <div className="project-desc">Real-time scoreboard web platform for live sports events — score tracking, display, and broadcast over the web.</div>
              <div className="project-stack">Firebase, Firestore, JavaScript, HTML, CSS</div>
            </div>
            <div className="project-item">
              <div className="project-name"><a href="https://yogi-finance.sazan.com.np/" target="_blank" rel="noopener noreferrer">Yogi Finance</a> — yogi-finance.sazan.com.np</div>
              <div className="project-desc">Progressive web app (PWA) for real-time household budgeting with multi-user authentication and shared dashboards.</div>
              <div className="project-stack">Firebase Auth, Firestore, PWA, JavaScript</div>
            </div>
            <div className="project-item">
              <div className="project-name">Click &amp; Cast Analytics Dashboard</div>
              <div className="project-desc">Live marketing analytics dashboard for a media company — GA4 tracking deployed on a Next.js production site, connected to Looker Studio for real-time reporting on sessions, users, traffic sources, and top pages.</div>
              <div className="project-stack">Google Analytics GA4, Looker Studio, Next.js</div>
            </div>
            <div className="project-item">
              <div className="project-name">Job Hunter Bot</div>
              <div className="project-desc">Automated job hunting system that scrapes LinkedIn, Remotive, and WeWorkRemotely daily, scores each posting 0–100 using Claude AI, generates tailored cover letters for top matches, logs results to Google Sheets, and sends an HTML email digest — fully automated on a serverless cron schedule.</div>
              <div className="project-stack">Python, Claude API, Modal, gspread, BeautifulSoup, Gmail SMTP, Google Sheets API</div>
            </div>
            <div className="project-item">
              <div className="project-name">AI Workflow Automations</div>
              <div className="project-desc">Suite of serverless REST API endpoints for automated email reply generation, client outreach sequencing, and data processing — integrated with n8n for trigger-based orchestration.</div>
              <div className="project-stack">Python, FastAPI, Modal, n8n, Anthropic API, OpenAI API</div>
            </div>
          </div>

          <hr className="divider" />

          <div className="section">
            <div className="section-heading">Skills</div>
            <div className="skills-grid">
              <div>
                <div className="skill-group-label">Data &amp; Analytics</div>
                <div className="skill-list">Python (pandas, scripting)<br/>SQL (joins, CTEs, aggregations)<br/>Data pipelines &amp; ETL<br/>Google Sheets API<br/>Web scraping (BeautifulSoup)</div>
              </div>
              <div>
                <div className="skill-group-label">AI &amp; Automation</div>
                <div className="skill-list">Claude / OpenAI API<br/>Agentic AI &amp; MCP<br/>Prompt engineering<br/>n8n workflow automation<br/>Modal + FastAPI (serverless)</div>
              </div>
              <div>
                <div className="skill-group-label">Cloud &amp; Systems</div>
                <div className="skill-list">Firebase, Firestore<br/>Azure AD, Microsoft 365<br/>Google Workspace Admin<br/>Cloudflare, DNS, SSL<br/>Git, Linux (Debian)</div>
              </div>
              <div>
                <div className="skill-group-label">BI &amp; Infrastructure</div>
                <div className="skill-list">Dashboards &amp; reporting<br/>Power BI (in progress)<br/>Google Analytics (GA4)<br/>Active Directory<br/>IT Security fundamentals</div>
              </div>
            </div>
          </div>

          <hr className="divider" />

          <div className="meta-row">
            <div>
              <div className="section-heading">Education</div>
              <div className="edu-degree">Postgraduate Certificate, Big Data Analytics</div>
              <div className="edu-school">Lambton College — Mississauga, ON</div>
              <div className="edu-year">May 2023 – Dec 2024</div>
              <div className="edu-degree" style={{ marginTop: "8px" }}>Bachelor of Engineering, Computer Science</div>
              <div className="edu-school">New Horizon College of Engineering — Bangalore, India</div>
              <div className="edu-year">Aug 2016 – Sep 2020</div>
            </div>
            <div>
              <div className="section-heading">Certifications</div>
              <div className="cert-item">Google IT Support Professional<span>Google / Coursera</span></div>
            </div>
            <div>
              <div className="section-heading">Languages</div>
              <div className="skill-list">
                English <span style={{ color: "#A0AEC0" }}>— Fluent</span><br/>
                Hindi <span style={{ color: "#A0AEC0" }}>— Fluent</span><br/>
                Nepali <span style={{ color: "#A0AEC0" }}>— Native</span><br/>
                Punjabi <span style={{ color: "#A0AEC0" }}>— Conversational</span>
              </div>
            </div>
          </div>

          <hr className="divider" />

          <div className="section" style={{ marginBottom: 0 }}>
            <div className="section-heading">Tools</div>
            <div className="tool-tags">
              {["Python","SQL","pandas","FastAPI","Modal","n8n","Claude API","Agentic AI","MCP","Codex","OpenAI API","Firebase","Google Sheets API","BeautifulSoup","Git","JavaScript","Azure Active Directory","Google Workspace","Microsoft 365","Cloudflare","Power BI","Jira","Notion"].map((t) => (
                <span key={t} className="tool-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
