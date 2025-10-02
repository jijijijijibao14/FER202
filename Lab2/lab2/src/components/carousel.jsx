export default function Carousel(){
    return(
        <div id="carouselExampleCaptions" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://product.hstatic.net/1000389344/product/beefy__5_4b648da73bcc49c1842ec1a9101bd8c7_master.png" class="d-block w-100" style={{ height:"500px", objectFit: "cover"}} alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Sausage corn Pizza</h5>
        <p>This Pizza không dành cho người ăn chay trường</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://file.hstatic.net/200000692767/file/pizza-margherita__1_.jpg" class="d-block w-100" style={{ height:"500px", objectFit: "cover"}} alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Pizza Margherita</h5>
        <p>This Pizza có rau nên người không ăn chay cũng không ăn được</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg" class="d-block w-100" style={{ height:"500px", objectFit: "cover"}} alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Pizza Mozzarella</h5>
        <p>dellicious, famous, come from Italia, so very expensive</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
        );
}