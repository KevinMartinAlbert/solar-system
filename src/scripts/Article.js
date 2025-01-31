class Article {
    constructor(name, description, type, radius, rotationAxis, rotationSpeed, orbitingCenter, orbitingSpeed, distanceFromOrbitingCenter) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.radius = radius;
        this.rotationAxis = rotationAxis;
        this.rotationSpeed = rotationSpeed;
        this.orbitingCenter = orbitingCenter;
        this.orbitingSpeed = orbitingSpeed;
        this.distanceFromOrbitingCenter = distanceFromOrbitingCenter;
    };

    createArticle() {
        const articleElm = document.createElement('article');
        articleElm.classList.add('planet-article');

        const nameElm = document.createElement('p');
        nameElm.textContent = `Name : ${this.name}`;

        const descriptionElm = document.createElement('p');
        descriptionElm.textContent = `Description : ${this.description}`;

        const typeElm = document.createElement('p');
        typeElm.textContent = this.type === 'sun' ? "Type : Yellow dwarf / G-type" : `Type : ${this.type}`;

        const radiusElm = document.createElement('p');
        radiusElm.textContent = `Radius : ${this.radius}`;

        const rotationAxisElm = document.createElement('p');
        rotationAxisElm.textContent = `Rotation axis : ${this.rotationAxis}`;

        const rotationSpeedElm = document.createElement('p');
        rotationSpeedElm.textContent = `Rotation speed : ${this.rotationSpeed}`;

        const orbitingCenterElm = document.createElement('p');
        orbitingCenterElm.textContent = `Orbiting center : ${this.orbitingCenter}`;

        const orbitingSpeedElm = document.createElement('p');
        orbitingSpeedElm.textContent = `Orbiting speed : ${this.orbitingSpeed}`;

        const distanceFromOrbitingCenterElm = document.createElement('p');
        distanceFromOrbitingCenterElm.textContent = `Distance from orbiting center : ${this.distanceFromOrbitingCenter}`;

        
        articleElm.appendChild(nameElm);
        articleElm.appendChild(descriptionElm);
        articleElm.appendChild(typeElm);
        articleElm.appendChild(radiusElm);
        articleElm.appendChild(rotationAxisElm);
        articleElm.appendChild(rotationSpeedElm);
        articleElm.appendChild(orbitingCenterElm);
        articleElm.appendChild(orbitingSpeedElm);
        articleElm.appendChild(distanceFromOrbitingCenterElm);

        return articleElm;
    };

    static display(article) {
        const mainElm = document.getElementById('main');
        mainElm.innerHTML = '';
        mainElm.appendChild(article);
    };

}

export { Article };