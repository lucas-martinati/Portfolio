export default function EducationCard({ item }) {
    return (
        <div className="education-item">
            <div className="education-card">
                <div className="education-period">{item.period}</div>
                <div className="education-content">
                    <h3 className="education-title">{item.title}</h3>
                    <p className="education-school">{item.school}</p>
                </div>
            </div>
        </div>
    );
}
