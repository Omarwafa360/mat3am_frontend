import React from 'react';
import { useLayout } from '@/contexts/LayoutContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GripVertical } from 'lucide-react';
import { motion } from 'framer-motion';

const LayoutEditorTab = () => {
  const { sections, setSections } = useLayout();

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSections(items);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>محرر تنسيق الصفحة الرئيسية</CardTitle>
          <p className="text-muted-foreground text-sm">
            قم بسحب وإفلات الأقسام لإعادة ترتيبها في الصفحة الرئيسية.
          </p>
        </CardHeader>
        <CardContent>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                  {sections.map(({ id, name }, index) => (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center p-4 bg-background rounded-lg border"
                        >
                          <GripVertical className="h-5 w-5 text-muted-foreground ml-3" />
                          <span>{name}</span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LayoutEditorTab;
