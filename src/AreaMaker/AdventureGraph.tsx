import { useEffect, useState } from "react";
import { useLoadGraph, useRegisterEvents, useSigma } from "@react-sigma/core";
import { useLayoutCircular } from "@react-sigma/layout-circular";
import { SerializedGraph } from "graphology-types";
import { DirectedGraph } from "graphology";

import { convertAreasToEdges, convertAreasToNodes } from "./domain/graphUtil";
import { Area } from "./domain/types";

type Props = {
    areas: Array<Area>;
    onAreaClick: (clickedArea: string) => void;
};

export const AdventureGraph = (props: Props) => {
    const { areas, onAreaClick } = props;
    
    const [draggedNode, setDraggedNode] = useState<string | null>(null);

    const sigma = useSigma();
    const registerEvents = useRegisterEvents();
    const loadgraph = useLoadGraph();

    sigma.setSetting('labelColor', { color: '#FCFEFF' });

    useEffect(() => {
        setDraggedNode(null);

        const serializedGraph: SerializedGraph = {
            attributes: { name: 'Adventure' },
            options: {
                allowSelfLoops: true,
                multi: false,
                type: 'directed'
            },
            nodes: convertAreasToNodes(areas),
            edges: convertAreasToEdges(areas)
        };
        const graph = DirectedGraph.from(serializedGraph);

        loadgraph(graph);
    }, [loadgraph, areas]);

    useEffect(() => {
        registerEvents({
            clickNode: (event) => {
                event.preventSigmaDefault();
                onAreaClick(event.node);
            },
            downNode: (event) => {
                console.log('DOWN');
                setDraggedNode(event.node);
            },
            mouseup: () => {
                console.log('UP');
                if (draggedNode) {
                    setDraggedNode(null);
                }
            },
            mousedown: () => {
                if (!sigma.getCustomBBox()) {
                    sigma.setCustomBBox(sigma.getBBox());
                }
            },
            mousemove: (event) => {
                if (draggedNode) {
                    const position = sigma.viewportToGraph(event);
                    sigma.getGraph().setNodeAttribute(draggedNode, "x", position.x);
                    sigma.getGraph().setNodeAttribute(draggedNode, "y", position.y);

                    // Prevent sigma from moving the camera
                    event.preventSigmaDefault();
                    event.original.preventDefault();
                    event.original.stopPropagation();
                }
            }
        });
    }, [registerEvents, sigma, draggedNode, setDraggedNode]);

    return null;
};
