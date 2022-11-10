let Engine = Matter.Engine,
  Composites = Matter.Composites,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Composite = Matter.Composite,
  Bodies = Matter.Bodies;

// create engine
let engine;

// add mouse control
let mouse;

let rectangle = Bodies.rectangle;

let canvas;
let matterObjs = [];
let colors = ["#d3af5b", "#f556fc", "#f12341", "#fda859", "#063de1"];

function createWalls(thickness) {
  let walls = [
    new Rect(width * 0.5, 0, width, thickness, {
      isStatic: true,
    }).setStrokeColor("#000000"),
    new Rect(width * 0.5, height, width, thickness, {
      isStatic: true,
    }).setStrokeColor("#000000"),
    new Rect(width, height * 0.5, thickness, height, {
      isStatic: true,
    }).setStrokeColor("#000000"),
    new Rect(0, height * 0.5, thickness, height, {
      isStatic: true,
    }).setStrokeColor("#000000"),
    new Rect(200, 150, 400, 20, {
      isStatic: true,
      angle: Math.PI * 0.15,
    }),
    new Rect(700, 350, 650, 20, {
      isStatic: true,
      angle: -Math.PI * 0.1,
    }),
    new Rect(300, 560, 600, 20, {
      isStatic: true,
      angle: Math.PI * 0.1,
    }),
  ];
  walls.forEach((wall) => matterObjs.push(wall));
}

function setup() {
  let dom = document.getElementById("sketch");
  canvas = createCanvas(
    dom.getBoundingClientRect().width,
    dom.getBoundingClientRect().height
  );
  canvas.parent("sketch");
  engine = Engine.create();
  world = engine.world;

  matterObjs.push(
    new Rect(
      width * 0.1,
      height * 0.1,
      random(25, 50),
      random(25, 50)
    ).setFillColor(colors[Math.floor(random(colors.length))])
  );
  matterObjs.push(
    new Polygon(width * 0.1, height * 0.1, 5, random(25, 50)).setFillColor(
      colors[Math.floor(random(colors.length))]
    )
  );
  matterObjs.push(
    new Circle(width * 0.1, height * 0.1, random(25, 50)).setFillColor(
      colors[Math.floor(random(colors.length))]
    )
  );

  createWalls(50);

  console.log(matterObjs);

  mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity();
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

  Composite.add(world, mouseConstraint);
}

function draw() {
  background(256);
  Engine.update(engine);

  matterObjs.forEach((obj) => {
    obj.render();
  });
  // matterObjs.forEach((obj) => {
  //   obj.renderDirVector();
  // });
}
