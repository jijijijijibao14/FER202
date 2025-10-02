export default function Navbar(){
    return(
        <div class="bg-dark p-3">
<nav class="navbar navbar-expand-lg container">
  <div class="container-fluid">
    <a class="navbar-brand text-white" href="#">Pizza House</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link text-white" href="#">Home</a>
        </li>
        <li class="nav-item"> 
          <a class="nav-link text-white" href="#">About Us</a>
        </li>
    
        <li class="nav-item">
          <a class="nav-link text-white" href="#">Contact</a>
        </li>
      </ul>
    </div>
  </div>
  <form class="d-flex" role="search">
      <input class="form-control" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
</nav>
    </div>

    );
}