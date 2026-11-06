"""Count text objects represented as geometry in GLB exports from 3ds Max.
A geometry-bearing node is counted when its own name, its mesh name or its parent node's name
starts with 'Text' (3ds Max text shapes; the Babylon exporter names some of their meshes PARTn_m).
Also reports which nodes the earlier CLI rule (own or mesh name only) missed, with mesh size."""
import json,struct,re,sys,hashlib,os
import numpy as np
T=re.compile(r'^(?:V\d*)?Text\d*',re.I)
out={"rule":"node, mesh or parent name starts with Text (3ds Max text shape)","earlier_cli_rule":"node or mesh name starts with Text","files":[]}
for fn in sys.argv[1:]:
    b=open(fn,'rb').read(); L=struct.unpack('<I',b[12:16])[0]; j=json.loads(b[20:20+L]); bin0=b[20+L+8:]
    def acc(i):
        a=j['accessors'][i]; bv=j['bufferViews'][a['bufferView']]; off=bv.get('byteOffset',0)+a.get('byteOffset',0)
        n={'SCALAR':1,'VEC3':3,'VEC2':2,'VEC4':4}[a['type']]; dt={5126:np.float32,5125:np.uint32,5123:np.uint16,5121:np.uint8}[a['componentType']]
        r=np.frombuffer(bin0,dtype=dt,count=a['count']*n,offset=off); return r.reshape(-1,n) if n>1 else r
    nodes=j.get('nodes',[]); par={c:i for i,n in enumerate(nodes) for c in n.get('children',[])}
    rows=[]
    for i,n in enumerate(nodes):
        if 'mesh' not in n: continue
        m=j['meshes'][n['mesh']]; own=n.get('name',''); mn=m.get('name',''); pn=nodes[par[i]].get('name','') if i in par else ''
        new=bool(T.match(own) or T.match(mn) or T.match(pn)); old=bool(T.match(own) or T.match(mn))
        if not new: continue
        P=acc(m['primitives'][0]['attributes']['POSITION']); ext=(P.max(0)-P.min(0)).round(3).tolist()
        rows.append({"node":own,"mesh":mn,"parent":pn,"vertices":int(len(P)),"extent":ext,"counted_by_earlier_rule":old})
    out["files"].append({"file":os.path.basename(fn),"sha256":hashlib.sha256(b).hexdigest(),"textAsGeometry":len(rows),
        "earlierRuleCount":sum(r["counted_by_earlier_rule"] for r in rows),"objects":rows})
out["total"]=sum(f["textAsGeometry"] for f in out["files"]); out["earlierRuleTotal"]=sum(f["earlierRuleCount"] for f in out["files"])
print(json.dumps(out,ensure_ascii=False,indent=1))
