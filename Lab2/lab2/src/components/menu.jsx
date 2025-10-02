export default function Menu(){
    const products =[
        {id : 1, name: "Sausage corn Pizza", price: 200000, image: "https://product.hstatic.net/1000389344/product/beefy__5_4b648da73bcc49c1842ec1a9101bd8c7_master.png"},
        {id : 2, name: "Pizza Margherita", price: 150000, image: "https://file.hstatic.net/200000692767/file/pizza-margherita__1_.jpg"},
        {id : 3, name: "Pizza Mozzarella", price: 300000, image: "https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg"},
        {id : 4, name: "Pesto Pizza", price: 200000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtWY1JaKmxc8uVFuH0L8nci32MIw0u5Fuplw&s"},  
    ]   
    return(
        <div class="bg-dark text-start text-white p-3">
            <div class="container">
            <h1>Our Menu</h1>
            <div class="row ">
                {products.map((product) =>(
                    <div class="col-3 p-2">
                        <div class="card h-100">
                            <img src={product.image} class="card-img-top" style={{ height:"200px", objectFit: "cover"}} alt="..."/>
                            <div class="card-body">
                                <h5 class="card-title">{product.name}</h5>
                                <p class="card-text">{product.price} VND</p>
                                <a href="#" class="btn btn-primary">Buy</a>   
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            </div> 
        </div>
    );
}