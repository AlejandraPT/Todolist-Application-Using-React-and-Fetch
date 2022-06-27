import React from "react";
import Listado from "./listado.jsx";

//include images into your bundle
import titulo from "../../img/titulo.png";

//create your first component
const Home = () => {
	return (
		<>
		<div className="container col-9 mb-3 text-center">
			<p>
				<img src={titulo} />
			</p>
			<Listado />
		</div>
		</>

	);
};

export default Home;
