import MyFooter from "../components/footer/myfooter";
export default function FooterPage() {
    return (
        <div className="footer">
            <h2 style={{textAlign: "center", maxWidth: 600, margin: "0 auto"}}></h2>
            <MyFooter author="BaoNQ" email="baonqde180823@fpt.edu.vn" linkGithub="Movie Management Project"/>
        </div>
    )
}