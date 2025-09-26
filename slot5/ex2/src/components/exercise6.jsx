export function Exercise6() {
  const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
];
  const sortedCompanies = [...companies].sort((a, b) => (a.end - b.end));
  const top3 = sortedCompanies.slice(0, 3);

  return (
    <div>
        <h1>Exercise 6</h1>
        <p> Danh sach da sort: </p>
        <ul>
          {sortedCompanies.sort().map((Company, end) => (<li key={Company.end}>{Company.name} - {Company.end}</li>))}
        </ul>
        <p> Top 3 cong ty ket thuc som nhat: </p>
        <ul>
          {top3.map((Company, end) => (<li key={Company.end}>{Company.name} - {Company.end}</li>))}
        </ul>
        
    </div>
  );
}


