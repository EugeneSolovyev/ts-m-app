import React, { Suspense } from 'react'
import WrapperView, { SuspenseComponent } from './styles'
import { Spin } from 'antd'
import Header from '../header'
import Aside from '../aside'
import Footer from '../footer'
import TrackList from '../track-list'

interface IWrapperProps {
    children: React.ReactNode;
}

const Fallback = () => <SuspenseComponent><Spin tip="Loading..." size="large" /></SuspenseComponent>

const Wrapper = ({ children }: IWrapperProps) => {
    return (
        <WrapperView>
            <Header />
            <main>
                <Aside content={<TrackList />} />
                <div className="content">
                    <Suspense fallback={<Fallback />}>
                        {children}
                    </Suspense>
                </div>
            </main>
            <Footer />
        </WrapperView>
    );
};

export default Wrapper;