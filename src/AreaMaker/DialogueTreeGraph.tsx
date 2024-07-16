import { useEffect, useState } from "react";
import { useLoadGraph, useRegisterEvents, useSigma } from "@react-sigma/core";
import { SerializedGraph } from "graphology-types";
import { DirectedGraph } from "graphology";

import { convertAreasToEdges, convertAreasToNodes } from "./domain/graphUtil";
import { Dialogue } from "./domain/types";

type Props = {
    areas: Array<Dialogue>;
    onAreaClick: (clickedArea: string) => void;
};

export const DialogueTreeGraph = (props: Props) => {
    const { areas, onAreaClick } = props;

    const [draggedNode, setDraggedNode] = useState<string | null>(null);

    const sigma = useSigma();
    const registerEvents = useRegisterEvents();
    const loadgraph = useLoadGraph();

    const existingNodes = sigma.getGraph().reduceNodes((acc, node, nodeAttributes) => {
        acc.set(
            node,
            {
                x: nodeAttributes['x'],
                y: nodeAttributes['y']
            }
        );

        return acc;
    }, new Map());

    sigma.setSetting('labelColor', { color: '#FCFEFF' });

    useEffect(() => {
        const serializedGraph: SerializedGraph = {
            attributes: { name: 'Adventure' },
            options: {
                allowSelfLoops: true,
                multi: false,
                type: 'directed'
            },
            nodes: convertAreasToNodes(areas, existingNodes),
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
                setDraggedNode(event.node);
            },
            mouseup: (event) => {
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
