export default function Date () {
    const dateNow = new Date();
    const fullDate = new Intl.DateTimeFormat("en-UK", {dateStyle: "full"}).format(dateNow);
    return (
        <div>
            <dateNow dateNow={fullDate}>
            </dateNow>
        </div>
    )
}