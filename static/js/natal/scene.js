function addTreeLayer(THREE, scene, radius, height, y, color) {
    const geometry = new THREE.ConeGeometry(radius, height, 12, 1);
    const material = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.82,
        metalness: 0.02,
        flatShading: true,
    });
    const layer = new THREE.Mesh(geometry, material);
    layer.position.y = y;
    scene.add(layer);
}

function createStarShape(THREE, outerRadius, innerRadius) {
    const shape = new THREE.Shape();
    const points = 10;

    for (let index = 0; index < points; index += 1) {
        const angle = -Math.PI / 2 + (index * Math.PI) / 5;
        const radius = index % 2 === 0 ? outerRadius : innerRadius;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        if (index === 0) {
            shape.moveTo(x, y);
        } else {
            shape.lineTo(x, y);
        }
    }

    shape.closePath();
    return shape;
}

function addGift(THREE, scene, options, shared) {
    const { x, z, scale, color } = options;
    const group = new THREE.Group();
    const width = 0.88;
    const depth = 0.7;
    const bodyHeight = 0.53;
    const lidHeight = 0.14;
    const totalHeight = bodyHeight + lidHeight;

    const bodyMaterial = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.58,
        metalness: 0.12,
    });
    const lidMaterial = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.48,
        metalness: 0.16,
    });

    const body = new THREE.Mesh(
        new THREE.BoxGeometry(width, bodyHeight, depth),
        bodyMaterial,
    );
    body.position.y = bodyHeight / 2;
    group.add(body);

    const lid = new THREE.Mesh(
        new THREE.BoxGeometry(width + 0.08, lidHeight, depth + 0.08),
        lidMaterial,
    );
    lid.position.y = bodyHeight + lidHeight / 2;
    group.add(lid);

    const frontRibbon = new THREE.Mesh(
        new THREE.BoxGeometry(width * 0.15, totalHeight, 0.025),
        shared.goldMaterial,
    );
    frontRibbon.position.set(0, totalHeight / 2, depth / 2 + 0.02);
    group.add(frontRibbon);

    const topRibbon = new THREE.Mesh(
        new THREE.BoxGeometry(width + 0.09, 0.025, depth + 0.09),
        shared.goldMaterial,
    );
    topRibbon.position.y = totalHeight + 0.012;
    group.add(topRibbon);

    const bowLeft = new THREE.Mesh(shared.bowGeometry, shared.goldMaterial);
    bowLeft.position.set(-0.13, totalHeight + 0.09, 0.015);
    bowLeft.scale.set(0.18, 0.095, 0.105);
    group.add(bowLeft);

    const bowRight = new THREE.Mesh(shared.bowGeometry, shared.goldMaterial);
    bowRight.position.set(0.13, totalHeight + 0.09, 0.015);
    bowRight.scale.set(0.18, 0.095, 0.105);
    group.add(bowRight);

    const bowKnot = new THREE.Mesh(shared.knotGeometry, shared.goldMaterial);
    bowKnot.position.set(0, totalHeight + 0.09, 0.035);
    group.add(bowKnot);

    group.position.set(x, 0.025, z);
    group.rotation.y = x < 0 ? 0.12 : -0.1;
    group.scale.setScalar(scale);
    scene.add(group);
}

function addTree(THREE, scene, shared) {
    addTreeLayer(THREE, scene, 1.45, 2, 1.05, 0x123e2b);
    addTreeLayer(THREE, scene, 1.13, 1.65, 1.85, 0x175036);
    addTreeLayer(THREE, scene, 0.81, 1.32, 2.52, 0x1c5b3d);

    const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.29, 0.68, 10),
        new THREE.MeshStandardMaterial({
            color: 0x795632,
            roughness: 0.88,
            metalness: 0.02,
        }),
    );
    trunk.position.y = 0.34;
    scene.add(trunk);

    const starGeometry = new THREE.ExtrudeGeometry(
        createStarShape(THREE, 0.34, 0.15),
        {
            depth: 0.12,
            bevelEnabled: true,
            bevelSegments: 2,
            steps: 1,
            bevelSize: 0.035,
            bevelThickness: 0.035,
        },
    );
    const star = new THREE.Mesh(starGeometry, new THREE.MeshStandardMaterial({
        color: 0xe5c36e,
        emissive: 0x4c3308,
        emissiveIntensity: 0.45,
        roughness: 0.28,
        metalness: 0.72,
    }));
    star.position.set(0, 3.52, 0);
    scene.add(star);

    const ornamentGeometry = new THREE.SphereGeometry(0.075, 12, 8);
    const ornaments = [
        [0, 0.64, 1.04],
        [-0.55, 0.94, 0.58],
        [0.56, 0.98, 0.55],
        [-0.32, 1.38, 0.31],
        [0.31, 1.42, 0.28],
        [0, 1.56, 0.76],
        [-0.48, 1.83, 0.39],
        [0.47, 1.87, 0.38],
        [0, 2.25, 0.52],
        [-0.2, 2.67, 0.2],
        [0.21, 2.73, 0.19],
    ];

    ornaments.forEach((position, index) => {
        const ornament = new THREE.Mesh(
            ornamentGeometry,
            index % 3 === 0 ? shared.champagneMaterial : shared.goldMaterial,
        );
        ornament.position.set(...position);
        scene.add(ornament);
    });
}

export function createChristmasScene(THREE, container) {
    let renderer;
    let resizeObserver;
    let usesWindowResize = false;
    let resizeHandler;
    let initialRenderCompleted = false;

    try {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
        renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "low-power",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.08;
        renderer.shadowMap.enabled = false;
        renderer.domElement.className = "cena-natalina__canvas";
        renderer.domElement.setAttribute("aria-hidden", "true");

        const hemisphereLight = new THREE.HemisphereLight(0xdce9d9, 0x102218, 1.7);
        scene.add(hemisphereLight);

        const mainLight = new THREE.DirectionalLight(0xffedc5, 2.2);
        mainLight.position.set(-3.5, 6, 5);
        scene.add(mainLight);

        const goldLight = new THREE.PointLight(0xe5bd68, 7, 9, 2);
        goldLight.position.set(3.1, 3.3, 2.4);
        scene.add(goldLight);

        const fillLight = new THREE.PointLight(0x80b58b, 4, 8, 2);
        fillLight.position.set(-3, 2.2, 1.2);
        scene.add(fillLight);

        const ground = new THREE.Mesh(
            new THREE.CircleGeometry(3.5, 48),
            new THREE.MeshBasicMaterial({
                color: 0x123423,
                transparent: true,
                opacity: 0.5,
                depthWrite: false,
            }),
        );
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = 0.015;
        scene.add(ground);

        const goldMaterial = new THREE.MeshStandardMaterial({
            color: 0xd5ad59,
            roughness: 0.3,
            metalness: 0.7,
        });
        const champagneMaterial = new THREE.MeshStandardMaterial({
            color: 0xf0d895,
            emissive: 0x493711,
            emissiveIntensity: 0.32,
            roughness: 0.25,
            metalness: 0.58,
        });
        const shared = {
            goldMaterial,
            champagneMaterial,
            bowGeometry: new THREE.SphereGeometry(1, 12, 8),
            knotGeometry: new THREE.SphereGeometry(0.07, 10, 8),
        };

        addTree(THREE, scene, shared);
        addGift(THREE, scene, { x: -0.72, z: 0.8, scale: 1, color: 0x74382f }, shared);
        addGift(THREE, scene, { x: 0.72, z: 0.67, scale: 0.78, color: 0x24533b }, shared);

        resizeHandler = () => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            if (width <= 0 || height <= 0) {
                return;
            }

            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.position.set(0, width < 560 ? 4.6 : 4.05, width < 560 ? 10 : 9.1);
            camera.lookAt(0, 1.82, 0);
            camera.updateProjectionMatrix();
            renderer.render(scene, camera);
            initialRenderCompleted = true;
        };

        container.appendChild(renderer.domElement);
        resizeHandler();
        if (!initialRenderCompleted) {
            throw new Error("A área da cena ainda não possui dimensões para renderização.");
        }

        if (typeof window.ResizeObserver === "function") {
            resizeObserver = new window.ResizeObserver(resizeHandler);
            resizeObserver.observe(container);
        } else {
            window.addEventListener("resize", resizeHandler, { passive: true });
            usesWindowResize = true;
        }
    } catch (error) {
        resizeObserver?.disconnect();
        if (usesWindowResize) {
            window.removeEventListener("resize", resizeHandler);
        }
        if (renderer) {
            renderer.domElement.remove();
            renderer.dispose();
        }
        throw error;
    }
}
