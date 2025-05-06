import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import DescriptionIcon from "@mui/icons-material/Description";

const CurriculumSection = ({ chapters }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Course Curriculum
            </Typography>

            {chapters.map((section, index) => (
                <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div className="flex flex-col">
                            <Typography fontWeight="bold">{section.title}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {section.lectures}
                            </Typography>
                        </div>
                    </AccordionSummary>

                    <AccordionDetails>
                        <List disablePadding>
                            {section.lessons.map((lesson, idx) => (
                                <ListItem
                                    key={idx}
                                    divider
                                    secondaryAction={
                                        <Typography variant="body2" color="text.secondary">
                                            {lesson.duration}
                                        </Typography>
                                    }>
                                    <ListItemIcon>
                                        {lesson.type === "video" ? (
                                            <PlayCircleOutlineIcon color="action" />
                                        ) : (
                                            <DescriptionIcon color="action" />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <div className="flex items-center">
                                                {lesson.title}
                                                {lesson.preview && (
                                                    <Typography variant="caption" color="primary" className="ml-2">
                                                        Preview
                                                    </Typography>
                                                )}
                                            </div>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default CurriculumSection;