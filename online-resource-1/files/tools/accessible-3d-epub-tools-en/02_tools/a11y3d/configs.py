# Copyright (c) 2026 Georgios Korakakis. MIT License, see LICENSE.txt.
# ENGLISH TRANSLATED DERIVATIVE (en-GB) — requires verification.
# Text content synchronised with the final embedded `var CFG` data of the five review pages (teliko_review/pages),
# which is authoritative; the Greek configs.py shipped in the original tools ZIP predates those scientific corrections.
# Semantic maps for the five 3D pages of the EPUB (one source for viewer, static page and fallback).
# Colours: orig = EPUB v2.1 material colour; safe = checked palette (dark stage, light stage).
SIG = {"dark": "#E69F00", "light": "#B35C00"}
HYB = {"dark": "#F0E442", "light": "#4D4D4D"}
PI1 = {"dark": "#56B4E9", "light": "#0072B2"}
PI2 = {"dark": "#2F8FD8", "light": "#003F63"}
PL1 = {"dark": "#CC79A7", "light": "#A83D7B"}
PL2 = {"dark": "#009E73", "light": "#00775A"}
PL3 = {"dark": "#D55E00", "light": "#B34700"}
HTR = {"dark": "#FFFFFF", "light": "#6B7680"}
HOP = {"dark": "#FFFFFF", "light": "#7A8590"}
CAT = {"dark": "#8C96A0", "light": "#15202B"}
NEU = {"dark": "#AAB4BE", "light": "#46525E"}
AXM = {"dark": "#FFFFFF", "light": "#15202B"}

AXES = dict(id="axes", label="x, y, z axes", matchColor=["#009FFE", "#F5F9F6"], orig="#009FFE", safe=NEU, quiet=True,
            description="Coordinate axes. The molecular axis is the C–C axis.")
LABELS3D = dict(id="labels", label="sp and p labels (3D)", match=["Text03-FACES", "Text15-FACES"], orig="#F19FE5", safe=AXM, quiet=True,
                description="The letters sp and p as 3D geometry. A screen reader does not read them; the same names appear in this list.")
PLANE_NOTE = "Contains the C–C axis. It is a symmetry plane of the molecule and also the nodal plane of one of the two π bonds: the π-electron density is zero in this plane."
ETHYNE = "Linear ethyne molecule, H–C≡C–H, with a bond angle of 180° (sp hybridisation). In total, the molecule has 3 σ bonds (1 C–C and 2 C–H) and 2 π bonds. The C≡C triple bond consists of 1 σ + 2 π; the two pairs of p orbitals that form the π bonds have mutually perpendicular axes."

PAGES = {}

PAGES["02-ethyne-structure-3d"] = dict(
  title="The structure of ethyne in 3D", eyebrow="Interactive 3D lesson", fallback="fallback-02",
  lede="Ball-and-stick model of ethyne, C₂H₂: how the atoms are bonded and why the molecule is linear.",
  models=[dict(id="m", name="Ethyne C₂H₂ (ball-and-stick)", glb="glb-02", zoom=2.1,
    summary=ETHYNE + " In the model, the spheres represent atoms and the cylinders represent bonds; the triple bond is drawn as three cylinders. Bond lengths: C≡C 1.20 Å, C–H 1.06 Å.",
    groups=[
      dict(id="C", label="Carbon atoms", orig="#AAAAAA", safe={"dark": "#66707A", "light": "#15202B"}, description="The two carbon atoms, which are sp-hybridised. The two sp hybrid orbitals of each carbon form the C–C and C–H σ bonds; the two unhybridised 2p orbitals form the two π bonds."),
      dict(id="H", label="Hydrogen atoms", orig="#E1E1E1", safe=HOP, description="The two terminal hydrogen atoms. Each is bonded to one carbon by a σ bond (sp–1s overlap)."),
      dict(id="CC", label="C≡C triple bond", orig="#AAAAAA", safe=PL1, description="Three cylinders between the carbons indicate a bond order of 3: one σ bond (sp–sp) and two π bonds (p–p). The cylinders do not correspond one-to-one to orbitals. Bond order 3, length 1.20 Å, shorter than C=C (1.34 Å) and C–C (1.54 Å)."),
      dict(id="CH", label="C–H bonds", orig="#E1E1E1", safe=SIG, description="Two single σ bonds, one at each end of the molecule, each 1.06 Å long."),
    ],
    post="""function(ctx){var T=ctx.THREE,g=ctx.groups,all=[];ctx.root.traverse(function(o){if(o.isMesh)all.push(o);});
      var sph=all.filter(function(o){return /VSph/.test(o.name);}),cyl=all.filter(function(o){return /VCyl/.test(o.name);});
      function hx(o){return '#'+o.material.color.getHexString(T.SRGBColorSpace).toUpperCase();}
      var c=function(o){return new T.Box3().setFromObject(o).getCenter(new T.Vector3());};
      sph.forEach(function(o){(hx(o)==='#AAAAAA'?g.C:g.H).meshes.push(o);});
      var cs=g.C.meshes.map(c),mid=cs[0].clone().add(cs[1]).multiplyScalar(.5),half=cs[0].distanceTo(cs[1])/2;
      cyl.forEach(function(o){(c(o).distanceTo(mid)<half*0.98?g.CC:g.CH).meshes.push(o);});}""",
    views=dict(side=dict(label="Side view", note="The molecular axis is horizontal: H–C≡C–H in a straight line, with an angle of 180°. The triple bond appears as three cylinders between the two carbons."),
               axis=dict(label="Along C–C", note="You are looking along the axis: all the atoms lie one behind another, because the molecule is linear."),
               top=dict(label="Top view", note="From above, the same straight H–C≡C–H arrangement is visible."))
  )])

PAGES["04-sp-orbital-viewer"] = dict(
  title="sp hybrid orbitals: formation and geometry", eyebrow="Interactive 3D lesson", fallback="fallback-04",
  lede="One s orbital and one p orbital of each carbon give two equivalent sp hybrids at 180°. The two remaining p orbitals form the two π bonds.",
  models=[dict(id="m", name="Orbitals of ethyne", glb="glb-04", axis=dict(group="sp"),
    hide=["Circle02-FACES001", "Circle04-FACES001", "Circle23-FACES001", "Circle24-FACES001", "Text03-FACES001", "Text06-FACES001"],
    summary=ETHYNE + " The model shows the sp hybrid lobes along the axis and the lobes of the two π bonds, with mutually perpendicular axes.",
    groups=[
      dict(id="sp", label="sp hybrid orbitals", match=["Circle01-FACES", "Circle03-FACES", "Circle25-FACES", "Circle26-FACES"], orig="#CACAC8", safe=HYB, layer="front",
           description="Lobes of the sp hybrid orbitals. Each carbon has two, in a straight line at 180°; they form the σ bonds."),
      dict(id="pi1", label="1st π bond", match=["PART2_"], orig="#5F5FDD", safe=PI1,
           description="One π bond: sideways overlap of one pair of unhybridised p orbitals, with lobes on both sides of the axis."),
      dict(id="pi2", label="2nd π bond", match=["PART1_"], orig="#5F5FDD", safe=PI2,
           description="The second π bond, from the other pair of p orbitals. The axis of its lobes is perpendicular to the axis of the lobes of the 1st π bond."),
      dict(id="plane1", label="Plane 1", match=["TRANSPARENT_PARTS_2"], orig="#C1BDDF", origAlpha=.3, safe=PL1, safeAlpha={"dark": .45, "light": .45}, outline=True, description=PLANE_NOTE + " Perpendicular to Plane 2."),
      dict(id="plane2", label="Plane 2 (stripes)", match=["TRANSPARENT_PARTS_1"], orig="#C1BDDF", origAlpha=.3, safe=PL2, safeAlpha={"dark": .45, "light": .45}, outline=True, pattern="stripes", description=PLANE_NOTE + " Perpendicular to Plane 1."),
      dict(id="H", label="Hydrogen atoms", match=["INITIAL_TRANSPARENT_", "Text07-FACES", "Text08-FACES"], orig="#FFFFFF", origAlpha=.2, safe=HTR, safeAlpha={"dark": .5, "light": .8},
           description="The two hydrogen atoms at the ends of the molecule."),
      AXES],
    views=dict(side=dict(label="Side view", note="The C–C axis is horizontal. The sp hybrid lobes are visible along the axis, and the π-bond lobes above, below, in front and behind."),
               axis=dict(label="Along C–C", note="You are looking along the axis: the lobes of the two π bonds form a cross, so the two π bonds are perpendicular to each other."),
               top=dict(label="Top view", note="From above, the axis is horizontal and one π bond appears in front of and behind the axis."))
  )])

PAGES["06-axes-pi-symmetry"] = dict(
  title="Axis and symmetry planes of ethyne", eyebrow="Interactive 3D lesson", fallback="fallback-06",
  lede="The molecular axis C∞ and three symmetry planes: one perpendicular to the axis (σh) and two containing it (σv).",
  models=[dict(id="m", name="Symmetry of ethyne", glb="glb-06", axis=dict(group="sp"), zoom=1.3,
    summary=ETHYNE + " The molecule belongs to the D∞h point group: rotation by any angle about the C∞ axis leaves it unchanged. The model shows the two sp lobes, the molecular axis, two C₂ axes and three symmetry planes. D∞h has infinitely many C₂ axes perpendicular to C∞ and infinitely many σv planes; the model shows a few of them as examples.",
    groups=[
      dict(id="sp", label="sp lobes", match=["Circle01-FACES", "Circle03-FACES"], orig="#CACAC8", safe=HYB,
           description="Lobes of the sp hybrids: each carbon has two sp hybrid orbitals pointing in opposite directions (180°), which give the linear geometry."),
      dict(id="axisM", label="Molecular axis C∞", orig="#8D79C3", safe=AXM,
           description="The principal axis. Rotation by any angle about it leaves the molecule unchanged."),
      dict(id="axesO", label="Other axes", orig="#8D79C3", safe=NEU, quiet=True, description="Two of the infinitely many C₂ axes: perpendicular to the molecular axis, passing through the midpoint of C≡C."),
      dict(id="sh", label="σh plane", orig="#60A3FA", origAlpha=.3, safe=PL1, safeAlpha={"dark": .4, "light": .4}, outline=True,
           description="Symmetry plane perpendicular to the C∞ axis, at the midpoint of the C≡C bond. Solid fill."),
      dict(id="sv1", label="σv1 plane (stripes)", orig="#F471B6", origAlpha=.3, safe=PL2, safeAlpha={"dark": .4, "light": .4}, outline=True, pattern="stripes",
           description="Symmetry plane containing the C∞ axis. It is also the nodal plane of one π bond."),
      dict(id="sv2", label="σv2 plane (dots)", orig="#4DDD80", origAlpha=.3, safe=PL3, safeAlpha={"dark": .4, "light": .4}, outline=True, pattern="dots",
           description="A second plane containing the axis, perpendicular to σv1. It is the nodal plane of the other π bond."),
    ],
    build="""function(T,root){var out=[],box=new T.Box3();root.updateMatrixWorld(true);
      root.traverse(function(o){if(o.isMesh&&/Circle0[13]-FACES/.test(o.name))box.expandByObject(o);});
      var s=box.getSize(new T.Vector3()),c=box.getCenter(new T.Vector3()),d=[s.x,s.y,s.z],ax=d.indexOf(Math.max.apply(null,d)),L=Math.max.apply(null,d)*0.62;
      var n=[new T.Vector3(1,0,0),new T.Vector3(0,1,0),new T.Vector3(0,0,1)],o1=n[(ax+1)%3],o2=n[(ax+2)%3];
      function plane(id,normal){var m=new T.Mesh(new T.PlaneGeometry(L,L),new T.MeshStandardMaterial({color:0xffffff,transparent:true,opacity:.3,side:T.DoubleSide}));
        m.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),normal);m.position.copy(c);m.name='plane-'+id;root.add(m);out.push({object:m,group:id});}
      plane('sh',n[ax]);plane('sv1',o1);plane('sv2',o2);
      root.traverse(function(o){if(o.isMesh&&/^TRANSPARENT_PARTS/.test(o.name)){var b=new T.Box3().setFromObject(o).getSize(new T.Vector3());var dd=[b.x,b.y,b.z];
        var long=Math.max.apply(null,dd)>1;out.push({object:o,group:long&&dd.indexOf(Math.max.apply(null,dd))===ax?'axisM':'axesO'});}});
      return out;}""",
    views=dict(side=dict(label="Side view", note="The C∞ axis is horizontal, with the two sp lobes pointing in opposite directions. σh intersects the axis perpendicularly; σv1 and σv2 contain it."),
               axis=dict(label="Along C∞", note="You are looking along C∞: σv1 and σv2 appear as a cross, perpendicular to each other, and σh is seen in full."),
               top=dict(label="Top view", note="From above, the C∞ axis is horizontal and one σv plane is seen in full."))
  )])

PAGES["07-complete-sigma-pi-explorer"] = dict(
  title="Exploring σ and π bonds in full", eyebrow="Interactive 3D lesson", fallback="fallback-07",
  lede="Show or hide σ bonds, π bonds and planes to connect the 3D model with the explanation of the bonding.",
  models=[dict(id="m", name="σ and π bonds in ethyne", glb="glb-07",
    hide=["Circle02-FACES", "Circle04-FACES", "Circle23-FACES", "Circle24-FACES"],
    summary=ETHYNE + " The model shows the σ-bond regions, the sp hybrid lobes, the two π bonds and two perpendicular planes containing the axis.",
    groups=[
      dict(id="sigma", label="σ-bond regions", match=["PART1_"], orig="#9FD95A", safe=SIG, layer="front",
           description="Regions of end-on (axial) overlap along the internuclear axis. Ethyne has three σ bonds: one C–C and two C–H."),
      dict(id="sp", label="sp hybrid orbitals", match=["Circle01-FACES", "Circle03-FACES", "Circle25-FACES", "Circle26-FACES"], orig="#CACAC8", safe=HYB,
           description="Lobes of the sp hybrid orbitals. Each carbon atom has two, in a straight line at 180°. The σ bonds are formed from these."),
      dict(id="pi", label="π bonds", match=["PART2_", "Circle19-FACES", "Circle09-FACES", "Circle16-FACES", "Circle21-FACES", "Circle05-FACES", "Circle22-FACES", "Circle18-FACES", "Circle06-FACES", "Circle20-FACES", "Circle27-FACES"], orig="#5F5FDC", safe=PI1,
           description="The two π bonds, formed by sideways overlap of the unhybridised p orbitals of the two carbons. The two pairs of p orbitals overlap sideways in mutually perpendicular directions and, together with the C–C σ bond, form the triple bond."),
      dict(id="plane1", label="Plane 1", match=["TRANSPARENT_PARTS_2"], orig="#BF4530", origAlpha=.3, safe=PL1, safeAlpha={"dark": .45, "light": .45}, outline=True, description=PLANE_NOTE + " Perpendicular to Plane 2. Shown with a solid outline."),
      dict(id="plane2", label="Plane 2 (stripes)", match=["TRANSPARENT_PARTS_1"], orig="#91D24F", origAlpha=.3, safe=PL2, safeAlpha={"dark": .45, "light": .45}, outline=True, pattern="stripes", description=PLANE_NOTE + " Perpendicular to Plane 1. Shown with stripes and an outline."),
      dict(id="H", label="Hydrogen atoms", match=["INITIAL_TRANSPARENT_", "Text07-FACES", "Text08-FACES"], orig="#FFFFFF", origAlpha=.2, safe=HTR, safeAlpha={"dark": .5, "light": .8},
           description="The two hydrogen atoms at the ends of the molecule. The molecule is linear: H–C≡C–H."),
      LABELS3D, AXES],
    views=dict(side=dict(label="Side view", note="The C–C axis is horizontal. The linear H–C≡C–H arrangement is visible, together with the π-bond lobes above, below, in front of and behind the axis."),
               axis=dict(label="Along C–C", note="You are looking along the C–C axis. The two planes appear as a cross: they are perpendicular to each other, as are the two π bonds."),
               top=dict(label="Top view", note="You are looking from above. The C–C axis is horizontal and one π bond appears in front of and behind the axis."))
  )])

# Page 12: the authors' own 3ds Max models (ethane: ybridismos/sp3 deino desmoys/ffhh.WRL, ethene: ybridismos/sp2 desmous/Untitled.3ds,
# ethyne: efarmoges 2/σ π δειχνω αιθινιο/deixno.3ds), converted by models3/fix.py with meaningful part names.
H12 = dict(id="H", label="Hydrogen atoms", match=["H_atom_"], orig="#31A131", origAlpha=.5, safe=HTR, safeAlpha={"dark": .55, "light": .8},
           description="The hydrogen atoms (spheres). Each is bonded to one carbon by a σ bond: overlap of a hybrid orbital with the hydrogen 1s orbital.")
LAB12 = dict(id="labels", label="Letters σ, π, H as 3D geometry", match=["label3d_"], orig="#B1581A", safe=AXM, quiet=True, off=True,
             description="The letters of the original model, modelled as 3D objects. They are hidden by default: a screen reader does not read them, and the same names appear in this list.")
AX12 = dict(id="axes", label="Coordinate axes", match=["axis_"], orig="#0059FD", safe=NEU, quiet=True,
            description="Three perpendicular axes with arrows at each carbon; one coincides with the C–C axis. The axis letters of the original model are not shown, because they were not the same in the three models.")
def SIGCC(kind, order): return dict(id="sigCC", label="C–C σ bond", match=["sigma_CC_"], orig="#949694", safe=SIG,
            description=f"The two {kind} lobes pointing towards each other along the C–C axis. Their end-on (axial) overlap is the σ bond, common to all three molecules; {order}.")
def HYB12(kind, n): return dict(id="hyb", label=f"{kind} hybrids towards H", match=["_lobe_CH_"], orig="#949694", safe=HYB,
            description=f"The remaining {kind} hybrid orbitals: {n} on each carbon, one for each C–H σ bond.")
GEO_NOTE = " In the original model the angles were schematic; during conversion, the lobes and hydrogen atoms were placed at the hybridisation angle."
AX = dict(dir=[0, 0, 1], up=[0, 1, 0])
PAGES["12-compare-3d"] = dict(
  title="Comparing sp³, sp² and sp in 3D", eyebrow="Interactive 3D lesson", fallback="fallback-12",
  lede="Ethane, ethene and ethyne side by side: the same carbon–carbon bond as a single, double and triple bond, with sp³, sp² and sp hybridisation.",
  models=[
    dict(id="c2h6", name="Ethane C₂H₆", glb="glb-c2h6", axis=AX, zoom=1.9,
      summary="sp³ hybridisation at each carbon: tetrahedral arrangement with angles of ≈109.5° (the ideal tetrahedral angle). 7 σ bonds (1 C–C and 6 C–H) and no π bond, because no unhybridised p orbital remains. The C–C single bond (about 1.54 Å) allows rotation about the axis, with a small energy barrier; the model shows the staggered conformation." + GEO_NOTE,
      hide=["C_nucleus_", "axis_label_"],
      groups=[SIGCC("sp³", "in ethane it is the only bond between the carbons (single bond)"), HYB12("sp³", "three"), H12, LAB12, AX12],
      views=dict(side=dict(label="Side view", note="The C–C axis is horizontal. Each carbon has four sp³ hybrids: one towards the other carbon and three towards hydrogen atoms, in a tetrahedral arrangement. There are no π lobes."),
                 axis=dict(label="Along C–C", note="You are looking along the C–C bond. In projection, the three hydrogen atoms on each carbon are 120° apart, and those on the front carbon are offset by 60° from those on the rear carbon: a six-pointed star, the staggered conformation."),
                 top=dict(label="Top view", note="From above, the C–C axis is horizontal, with the σ bond in the centre and the hydrogen atoms around each carbon at angles of ≈109.5°."))),
    dict(id="c2h4", name="Ethene C₂H₄", glb="glb-c2h4", axis=AX, zoom=1.5,
      summary="sp² hybridisation at each carbon: trigonal planar arrangement with angles of ≈120° (the ideal sp² angle; in the real molecule the angles differ slightly), with all atoms in the same plane. 5 σ bonds (1 C–C and 4 C–H) and 1 π bond. Each carbon retains one unhybridised 2p orbital, perpendicular to the plane; their sideways overlap, above and below the plane, is the π bond. C=C double bond, 1.34 Å." + GEO_NOTE,
      hide=["C_nucleus_", "axis_label_"],
      groups=[SIGCC("sp²", "together with the π bond, it forms the C=C double bond"), HYB12("sp²", "two"),
              dict(id="pi", label="π bond (p orbitals)", match=["pi_p_lobe_", "pi_overlap_line_"], orig="#1C1CB8", safe=PI1,
                   description="The two unhybridised 2p orbitals, one on each carbon, perpendicular to the molecular plane. The lines between them show the sideways overlap above and below the plane: this is the π bond."),
              H12, LAB12, AX12],
      views=dict(side=dict(label="Side view", note="The C=C axis is horizontal and you see the molecular plane edge-on. The p lobes of the π bond are above and below the plane."),
                 axis=dict(label="Along C=C", note="You are looking along the C=C bond. The hydrogen atoms lie on a horizontal line, because the molecule is planar, and the π lobes are above and below."),
                 top=dict(label="Top view", note="From above, you see the whole molecular plane: around each carbon, three sp² hybrids at angles of ≈120°. The π lobes are perpendicular to the plane, pointing towards and away from you."))),
    dict(id="c2h2", name="Ethyne C₂H₂", glb="glb-c2h2", axis=AX, zoom=1.2,
      summary="sp hybridisation at each carbon: linear H–C≡C–H arrangement with an angle of 180°. 3 σ bonds (1 C–C and 2 C–H) and 2 π bonds. Each carbon retains two unhybridised 2p orbitals, perpendicular to each other; two π bonds form, with mutually perpendicular nodal planes. C≡C triple bond, 1.20 Å.",
      hide=["axis_label_"],
      groups=[SIGCC("sp", "together with the two π bonds, it forms the C≡C triple bond"), HYB12("sp", "one"),
              dict(id="piA", label="1st π bond", match=["pi1_"], orig="#1C1CB6", safe=PI1,
                   description="One π bond: a pair of 2p orbitals with lobes above and below the axis, and the lines indicating sideways overlap."),
              dict(id="piB", label="2nd π bond (stripes)", match=["pi2_"], orig="#1C1CB6", safe=PL2, pattern="stripes",
                   description="The second π bond: the other pair of 2p orbitals, in front of and behind the axis, perpendicular to the 1st π bond."),
              H12, LAB12, AX12],
      views=dict(side=dict(label="Side view", note="The axis is horizontal: H–C≡C–H in a straight line, with an angle of 180°. The lobes of the 1st π bond are above and below the axis; those of the 2nd are in front and behind."),
                 axis=dict(label="Along C≡C", note="You are looking along the axis. The lobes of the two π bonds form a cross: the two π bonds are perpendicular to each other."),
                 top=dict(label="Top view", note="From above, the straight H–C≡C–H line is visible; the 2nd π bond appears in front of and behind the axis."))),
  ])
