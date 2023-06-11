import { FC } from 'react';
import { useNavigate } from 'react-router';

const AnalyticsSelectionPage: FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center' }}>
            <main role="main" className="p-3">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Analytics</h1>
                </div>
                <div className="jumbotron p-3">
                    <div className="container bg-light p-3">
                        <div>
                            <label><b>ERC20</b> Collection Information</label><button onClick={ () => navigate("/erc20-collection-information") } style={{ marginLeft: '1.5rem' }} className='btn btn-success'>View</button>
                            <hr style={{ marginTop: '2rem', marginBottom: '2rem' }} />
                            <label><b>ERC721</b> Collection Information</label><button style={{ marginLeft: '1rem' }} onClick={ () => navigate("/erc721-collection-information") } className='btn btn-success'>View</button>
                        </div>
                    </div>
                </div>
            </main> 
        </div>
    )
}

export default AnalyticsSelectionPage;