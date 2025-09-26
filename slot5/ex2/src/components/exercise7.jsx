export function Exercise7() {
    const companies = [
        { name: "Company Two", start: 1992, end: 2008 },
        { name: "Company Four", start: 1989, end: 2010 },  
        { name: "Company Nine", start: 1981, end: 1989 },
    ];
    const company0New = {...companies[0], start: companies[0].start + 1};
    const concatAll = (...arrays) => [].concat(...arrays);

    return (
        <div>
            <h1>Exercise 7</h1>
            <p> Company 0 sau khi tang start len 1: </p>
            <p> Truóc: {companies[0].name} - {companies[0].start} <br />
                Sau:   {company0New.name} - {company0New.start}</p>
            
            <p> Demo concatAll function: </p>
            <p>concatAll([1,2],[3],[4,5]) = {JSON.stringify(concatAll([1,2],[3],[4,5]))} </p>
        </div>
    );
}