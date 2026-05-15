import { Box, Button, Container, Pagination, Typography } from '@mui/material'
import QuestionsTabel from '../../../components/muiComponents/questionsTabel/QuestionsTabel'
import useGetQuestions from '../../../hooks/supervisorHooks/useGetQuestions';
import DashboardNavbar from '../../../components/muiComponents/dashboardNavbar/DashboardNavbar';
import Loader from '../../../components/uiVerseComponents/loader/Loader';
import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from 'react';
import RightDrawer from '../../../components/muiComponents/rightDrawer/RightDrawer';
import QuestionSearch from '../../../components/filterSearch/questionSearch/QuestionSearch';
import DashboardFooter from "../../../components/dashboardFooter/DashboardFooter";
function ReportQuestions() {
    const { isError, error, isLoading, data } = useGetQuestions();
    console.log("data  ", data);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);//رقم الصفحة الحالي بالبداية خليته 1

    const filteredData =
    data?.filter((question) =>
        question.text?.toLowerCase().includes(search.toLowerCase()) ||
        question.code?.toLowerCase().includes(search.toLowerCase())
    ) || [];


    useEffect(() => {
        setPage(1);
    }, [search]);

    const itemsPerPage = 12;//عدد العناصر اللي بدي تنعرض بكل صفحة كم ؟ 
    const paginatedData = filteredData?.slice( // قسمت البيانات حسب الصفحة الجديدة عشان اعرف ايش رح اعرض   array.slice(start, end)
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );
    const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage); // عشان احسب عدد الصفحات الجديدة مثلا 20 عنصر /6=3.33 استعملت من مكتبة ماث سيل عشان اجبر اللي بعد الفاصلة العشرية وافتحلهن صفحة 



    return (
        <Box sx={{
            bgcolor: "var(--navy-color)",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            position: "relative"
        }}>
            <DashboardNavbar />
            <Box
                component={"section"}
                sx={{
                    paddingBottom: "40px",
                    flexGrow: 1,
                    alignItems: "flex-start",
                    display: "block",
                    minHeight: "100vh",
                }}
            >
                <Container maxWidth="lg">
                    {/* server errors */}
                    {isError && (
                        <Box
                            component={"section"}
                            className="server_error_section flex_column"
                            sx={{
                                bgcolor: "var(--navy-color)",
                                position: "absolute",
                                inset: 0,
                                top: "90px",
                                zIndex: 1,
                            }}
                        >
                            <Typography
                                component={"h1"}
                                variant="h5"
                                sx={{
                                    marginTop: "290px",
                                    color: "white",
                                    fontWeight: "700",
                                    textAlign: "center",
                                    "@media (max-width:456px)": {
                                        fontSize: "20px",
                                    },
                                }}
                            >
                                {error?.message}
                            </Typography>
                        </Box>
                    )}
                    {isLoading && (
                        <Box
                            sx={{
                                bgcolor: "var(--navy-color)",
                                position: "absolute",
                                inset: 0,
                                top: "90px",
                                display: "flex",
                                justifyContent: "center",
                                zIndex: 1,
                            }}
                        >
                            <Box sx={{ marginTop: "290px" }}>
                                <Loader />
                            </Box>
                        </Box>
                    )}
                    <Box className="section_titel" sx={{ marginBottom: "23px", paddingTop: { xs: "30px", md: "0px" } }}>
                        <Typography
                            component={"h1"}
                            variant="h4"
                            sx={{
                                color: "#fff",
                                fontFamily: "var(--primary-font)",
                                fontWeight: "600",
                                display: "inline",
                                marginRight: "10px",
                                "@media (max-width:700px)": {
                                    fontSize: "22px",
                                },
                            }}
                        >
                            Report Questions
                        </Typography>
                        <Typography
                            component={"span"}
                            sx={{
                                color: "#fff",
                                fontFamily: "var(--primary-font)",
                                fontSize: "20px",
                                "@media (max-width:700px)": {
                                    fontSize: "15px",
                                },
                                "@media (max-width:379px)": {
                                    display: "block",
                                },
                            }}
                        >
                            <Typography
                                component={"span"}
                                sx={{
                                    color: "var(--primary-color)",
                                    fontFamily: "var(--primary-font)",
                                }}
                            >
                                {filteredData?.length}
                            </Typography>{" "}
                            questions found
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: { xs: "flex-start", }, "@media (max-width:1142px)": { flexDirection: 'column' }, marginBottom: '20px' }}>
                            <Typography sx={{ color: "var(--secondary-color)", marginTop: "4px" }}>
                                Managing and organizing the questions used for report evaluation.
                            </Typography>
                            <Button
                                onClick={() => setOpen(true)}
                                sx={{
                                    bgcolor: "#ed2c2c",
                                    color: "#f0f2f5",
                                    display: "flex",
                                    paddingX: { xs: '10px', md: '15px' },
                                    paddingY: { xs: '5px', md: '10px' },
                                    gap: '10px',
                                    justifyContent: "center",
                                    textAlign: "center",
                                    borderRadius: "25px",
                                    whiteSpace: "nowrap",
                                    boxShadow: "0 0 15px rgba(207, 25, 25, 0.81)",
                                    transition: "all 0.2s ease-in-out",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0 6px 15px rgba(0,0,0,0.25)",
                                    },
                                    "@media (max-width:1142px)": { marginY: '20px' },

                                }}
                            > <Box sx={{ alignItems: 'center', display: 'flex' }}>
                                    <FiPlus size={20} style={{ flexShrink: 0 }} />
                                </Box>
                                <Typography sx={{
                                    fontSize: "17px",
                                    justifyContent: "flex-start",
                                    display: 'flex',
                                    textTransform: "capitalize",
                                    fontWeight: "500",
                                    "@media (max-width:1140px)": {
                                        fontSize: "15px",
                                    }
                                }}>
                                    Create Question
                                </Typography>
                            </Button>
                        </Box>
                    </Box>
                    <QuestionSearch
                        search={search}
                        setSearch={setSearch}
                    />

                    <RightDrawer open={open} setOpen={setOpen} />

                    <Box sx={{ minHeight: "768px" }}>
                        <QuestionsTabel data={paginatedData} search={search} totalCount={data?.length || 0}/>
                    </Box>
                    {filteredData.length > 0 && totalPages > 1 && (
                    <Box
                        className="pagination"
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "30px",
                            padding: "20px",

                        }}
                    >
                        <Pagination
                            count={totalPages} // عدد الصفحات وهن الارقام اللي مبينات بالباجينيشن
                            page={page} // الصفحة الحالية
                            onChange={(event, value) => setPage(value)} //  تغيير الصفحة لما نكبس عالباجينيشن جيب رقمها وحطها بسيت البيج عشان نرجع نعيد الموضوع من الاول للصفحة الجديدة
                            sx={{
                                "& .MuiPaginationItem-root": {
                                    color: "#fff",
                                    borderRadius: "10px",
                                },
                                "& .Mui-selected": {
                                    backgroundColor: "#ff0000 !important",
                                    color: "#fff",
                                },
                            }}
                        />
                    </Box>
                    )}
                </Container>
            </Box>


            <DashboardFooter />
        </Box>
    )
}

export default ReportQuestions